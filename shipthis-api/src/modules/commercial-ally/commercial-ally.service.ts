import { MapperOrderResume } from './../../mapper/mapper-order-resume';
import { EmailService } from './../email/email.service';
import { Response } from 'express';
import { BillDto } from './../ordersheet/dto/bill.dto';
import { MapperBill } from './../../mapper/mapper-bill';
import { Trajectory } from './../ordersheet/entities/trajectory.entity';
import { PickupStatus } from './constants/pickup-status.enum';
import { ItemPriceHistRepository } from './../item-type/repositories/item-price-hist.repository';
import { ItemPriceHist } from './../item-type/entities/item-price-hist.entity';
import { CharacteristicRepository } from './../item-type/repositories/characteristic.repository';
import { CharPriceHist } from './../item-type/entities/char-price-hist.entity';
import { Characteristic } from './../item-type/entities/characteristic.entity';
import { Item } from './../ordersheet/entities/item.entity';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { Injectable } from '@nestjs/common';
import { AppLoggerService } from 'src/log/applogger.service';
import { CommercialAllyRepository } from './repositories/commercial-ally.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { PickupRepository } from './repositories/pickup.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CommercialAlly } from './entities/commercial-ally.entity';
import { Warehouse } from './entities/warehouse.entity';
import { Pickup } from './entities/pickup.entity';
import { Place } from '../ordersheet/entities/place.entity';
import { NewCommercialAllyDto } from './dto/new-commercial-ally.dto';
import { WarehouseInfoDto } from './dto/warehouse-info.dto';
import { PickupsInfoDto } from './dto/pickups-info.dto';
import { WarehousesInfoDto } from './dto/warehouses-info.dto';
import { CommercialAllyInfoDto } from './dto/commercial-ally-info.dto';
import { UpdateCommercialAllyDto } from './dto/update-commercial-ally.dto';
import { PlaceRepository } from '../ordersheet/repositories/place.repository';
import { MapperWarehouse } from '../../mapper/mapper-warehouse';
import { MapperCommercialAlly } from '../../mapper/mapper-commercial-ally';
import { MapperPickup } from '../../mapper/mapper-pickup';
import { CommercialAllyStatus } from './constants/commercial-ally-status.enum';
import { IDaoLocation } from './../dao/interfaces/dao-location.interface';
import { DaoLocationFactory } from './../dao/factories/dao-location-factory';
import { IDaoFactory } from './../dao/factories/interface/IDaofactory.interface';
import {
  InvalidAddressException,
  CommercialAllyNotFoundException,
  WarehouseNotFoundException,
  CommercialAllyDeletedException,
  WarehouseDeletedException,
  LocatorConectionException,
  BadItemStructureException,
  PickupNotFoundException,
} from 'src/common/exceptions';
import { DaoFactoryConstans } from '../dao/factories/constants/dao-factory-constants.enum';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseStatus } from './constants/warehouse-status.enum';
import { isArray } from 'util';

@Injectable()
export class CommercialAllyService {
  constructor(
    @InjectRepository(CommercialAllyRepository)
    private readonly _commercialAllyRepo: CommercialAllyRepository,
    @InjectRepository(WarehouseRepository)
    private readonly _warehouseRepo: WarehouseRepository,
    @InjectRepository(PickupRepository)
    private readonly _pickupRepo: PickupRepository,
    @InjectRepository(PlaceRepository)
    private readonly _placeRepo: PlaceRepository,
    @InjectRepository(CharacteristicRepository)
    private readonly _charRepo: CharacteristicRepository,
    @InjectRepository(ItemPriceHistRepository)
    private readonly _itemPriceRepo: ItemPriceHistRepository,
    private readonly _emailService: EmailService,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async calculatePickup(pickup: CreatePickupDto): Promise<any> {
    this._appLogger.log(
      'Handling New Request: pickup bill calculation Service',
    );
    const new_pickup: Pickup = await this.validatePickupCreation(pickup);
    this.setPricesOnPickup(new_pickup);
    return this.generateBill(new_pickup);
  }

  async registerPickup(pickup: CreatePickupDto, res: Response): Promise<any> {
    this._appLogger.log('Handling New Request: pickup registration Service');
    const new_pickup: Pickup = await this.validatePickupCreation(pickup);
    this.setPricesOnPickup(new_pickup);
    const saved_pickup = await this._pickupRepo.registerPickup(new_pickup);
    const bill = this.generateBill(saved_pickup);
    this._emailService.generateInvoice(bill, res, 'pickup');
    return bill;
  }

  async searchPickupDetail(tracking_id: string): Promise<any> {
    this._appLogger.log('Handling New Request: Search pickup Detail service');
    const pickup: Pickup = await this.validateExistingPickup(tracking_id);
    return MapperOrderResume.generateOrderResumeFromPickup(pickup);
  }

  private async validateExistingPickup(id: string): Promise<Pickup> {
    const pickup: Pickup = await this._pickupRepo.fetchPickup(id);

    if (!pickup) {
      throw new PickupNotFoundException();
    }
    return pickup;
  }

  private generateBill(pickup: Pickup): BillDto {
    return MapperBill.generateBillFromPickup(pickup);
  }

  private setPricesOnPickup(pickup: Pickup): void {
    const distance_km: number = Number(pickup.trajectories.distance) / 1000;
    const base_price = Number(pickup.item_price_hist.base_price);
    const price_gr_km: number = Number(pickup.item_price_hist.price_km) / 1000;

    let pick_base_cost = 0;

    pickup.items.map(item => {
      let item_total_tax = 0;
      for (const char of item.characteristics) {
        item_total_tax += Number(char.tax);
      }
      const item_cost =
        base_price +
        (price_gr_km *
          distance_km *
          this.getDimensionalWeight(item) *
          (100 + item_total_tax)) /
          10000;
      item.item_cost = Number(item_cost.toFixed(2));
      pick_base_cost += Number(item_cost.toFixed(2));
    });

    pickup.facturation_amount = pick_base_cost;
    pickup.facturation_amount = Number(pickup.facturation_amount.toFixed(2));
  }

  private getDimensionalWeight(item: Item): number {
    const weight: number = item.item_weight;
    const volume: number =
      (item.item_width * item.item_length * item.item_height) / 5;
    return Math.max(weight, volume);
  }

  private async validatePickupCreation(
    pickup: CreatePickupDto,
  ): Promise<Pickup> {
    //validate commertial ally
    const commercial_ally: CommercialAlly = await this.validateCommercialAlly(
      pickup.commercial_ally_api_key,
    );

    if (commercial_ally.status === CommercialAllyStatus.DELETED) {
      throw new CommercialAllyDeletedException();
    }

    //validate warehouse
    const warehouse: Warehouse = await this.confirmWarehouse(
      commercial_ally,
      pickup.Warehouse_id,
    );
    warehouse.commercial_ally = commercial_ally;

    //validate items
    const items_to_insert: Item[] = await this.validateItems(pickup.items);

    //validate destination address
    const dest_address: Place = await this.validateAddress(
      pickup.destination_address,
    );

    //create trajectory
    const pickup_route: Trajectory = await this.generateTrajectory(
      warehouse.place,
      dest_address,
    );

    //create pickup
    return this.buildPickup(
      pickup,
      warehouse,
      pickup_route,
      dest_address,
      items_to_insert,
    );
  }

  private async buildPickup(
    pickup: CreatePickupDto,
    warehouse: Warehouse,
    trajectory: Trajectory,
    destination: Place,
    items: Item[],
  ): Promise<Pickup> {
    const new_pickup: Pickup = new Pickup();

    new_pickup.rec_email = pickup.rec_email;
    new_pickup.rec_name = pickup.rec_first_name;
    new_pickup.rec_last_name = pickup.rec_last_name;
    new_pickup.rec_phone_numer = pickup.rec_phone_number;
    new_pickup.creation_date = new Date();
    new_pickup.status = PickupStatus.DELIVERY;

    new_pickup.items = items;
    new_pickup.item_price_hist = await this.getCurrentPrice();
    new_pickup.trajectories = trajectory;
    new_pickup.origin_warehouse = warehouse;
    new_pickup.destination_place = destination;

    return new_pickup;
  }

  private async generateTrajectory(
    origin_place: Place,
    dest_place: Place,
  ): Promise<Trajectory> {
    const origin = { long: null, lat: null };
    const destination = { long: null, lat: null };

    origin.long = origin_place.position_long;
    origin.lat = origin_place.position_lat;

    destination.long = dest_place.position_long;
    destination.lat = dest_place.position_lat;

    const factory: IDaoFactory = new DaoLocationFactory();
    const locator: IDaoLocation = factory.factoryMethod(
      DaoFactoryConstans.LOCATIONIQ,
    );
    const trajectory: Trajectory = await locator.generateTrajectory(
      origin,
      destination,
    );

    if (!trajectory) throw new LocatorConectionException();

    return trajectory;
  }

  private async getCurrentPrice(): Promise<ItemPriceHist> {
    return await this._itemPriceRepo.getCurrentPrice();
  }

  private async validateItems(item_list: any[]): Promise<Item[]> {
    const itemsToInsert: Item[] = [];
    const active_charateristics: Characteristic[] = await this._charRepo.getAllCharacteristics();

    let newItem: Item;
    for (const item of item_list) {
      if (
        !item.item_weight ||
        typeof item.item_weight !== 'number' ||
        !item.item_length ||
        typeof item.item_length !== 'number' ||
        !item.item_width ||
        typeof item.item_width !== 'number' ||
        !item.item_height ||
        typeof item.item_height !== 'number'
      ) {
        throw new BadItemStructureException();
      }

      newItem = new Item();
      newItem.characteristics = [];
      let new_characteristic: Characteristic;
      if (item.characteristics) {
        if (isArray(item.characteristics)) {
          for (const char of item.characteristics) {
            if (!char.characteristic_id) {
              throw new BadItemStructureException();
            }
            new_characteristic = null;
            new_characteristic = active_charateristics.find(
              e => e.characteristic_id === char.characteristic_id,
            );
            if (!new_characteristic) {
              throw new BadItemStructureException();
            }
            const posible_char = newItem.characteristics.find(
              e =>
                e.char_price_hist_id ===
                new_characteristic.char_price_hists[0].char_price_hist_id,
            );
            if (!posible_char) {
              const char_to_inset: CharPriceHist =
                new_characteristic.char_price_hists[0];
              const { char_price_hists, ...char_info } = new_characteristic;
              char_to_inset.characteristic = char_info as Characteristic;
              newItem.characteristics.push(char_to_inset);
            }
          }
        } else {
          throw new BadItemStructureException();
        }
      }

      newItem.description = item.description;
      newItem.item_weight = item.item_weight;
      newItem.item_height = item.item_height;
      newItem.item_length = item.item_length;
      newItem.item_width = item.item_width;

      itemsToInsert.push(newItem);
    }

    return itemsToInsert;
  }

  private async confirmWarehouse(
    commercial_ally: CommercialAlly,
    id: number,
  ): Promise<Warehouse> {
    const warehouse: Warehouse = await this._warehouseRepo.getWarehouseFromAlly(
      id,
      commercial_ally,
    );
    if (!warehouse) console.log('no hay warehouse :>> ');
    if (!warehouse) throw new WarehouseNotFoundException();
    if (warehouse.status === WarehouseStatus.DELETED)
      throw new WarehouseDeletedException();
    return warehouse;
  }

  async createCommercialAlly(
    newCommercialAlly: NewCommercialAllyDto,
  ): Promise<NewCommercialAllyDto> {
    this._appLogger.log(
      'Handling New Request: Creating New Commercial Ally Service',
    );

    const warehouses: Warehouse[] = await this.validateWarehouses(
      newCommercialAlly.warehouses,
    );

    const commercial_ally: CommercialAlly = await this._commercialAllyRepo.createNewCommercialAlly(
      newCommercialAlly,
      warehouses,
    );

    this._appLogger.log('New Commercial Ally has been created sucessfully');

    return commercial_ally;
  }

  private async validateWarehouses(
    warehouses: Warehouse[],
  ): Promise<Warehouse[]> {
    const warehousesToInsert: Warehouse[] = [];

    for (const warehouse of warehouses) {
      const place: Place = await this.validateAddress(warehouse.place.address);
      warehouse.place = place;
      warehouse.status = WarehouseStatus.ACTIVE;
      warehousesToInsert.push(warehouse);
    }

    return warehousesToInsert;
  }

  async createWarehouse(newWarehouse: WarehouseInfoDto): Promise<any> {
    this._appLogger.log('Handling New Request: Creating New Warehouse Service');

    const place: Place = await this.validateAddress(newWarehouse.address);

    const commercial_ally: CommercialAlly = await this.validateCommercialAlly(
      newWarehouse.commercial_ally_key,
    );

    if (commercial_ally.status === CommercialAllyStatus.DELETED) {
      throw new CommercialAllyDeletedException();
    }

    const warehouse: Warehouse = await this._warehouseRepo.createWarehouses(
      newWarehouse,
      commercial_ally,
      place,
    );

    const warehouseInfo = MapperWarehouse.warehouseToWarehouseBasicInfo(
      warehouse,
    );

    this._appLogger.log('New Warehouse has been created sucessfully');

    return warehouseInfo;
  }

  async getAllCommercialAllies(): Promise<CommercialAllyInfoDto[]> {
    this._appLogger.log(
      'Handling New Request: Consulting Commercial Allies Service',
    );

    const commercialAllies: CommercialAlly[] = await this._commercialAllyRepo.getAllCommercialAllies();

    const commercialAlliesInfo: CommercialAllyInfoDto[] = [];

    commercialAllies.forEach(ally => {
      commercialAlliesInfo.push(
        MapperCommercialAlly.commercialAllyToCommercialAllyInfo(ally),
      );
    });

    this._appLogger.log('Commercial Allies has been consulted sucessfully');

    return commercialAlliesInfo;
  }

  async updateCommercialAlly(
    newCommercialAlly: UpdateCommercialAllyDto,
  ): Promise<any> {
    this._appLogger.log('Handling New Request: Update Commercial Ally Service');

    const commercial_ally: CommercialAlly = await this.validateCommercialAlly(
      newCommercialAlly.commercial_ally_key,
    );

    if (commercial_ally.status === CommercialAllyStatus.DELETED) {
      throw new CommercialAllyDeletedException();
    }

    const response = this._commercialAllyRepo.updateCommercialAlly(
      newCommercialAlly,
    );

    this._appLogger.log('Commercial Ally has been updated sucessfully');

    return response;
  }

  async deleteCommercialAlly(commercial_ally_key: string): Promise<any> {
    this._appLogger.log('Handling New Request: Delete Commercial Ally Service');

    const commercial_ally: CommercialAlly = await this.validateCommercialAlly(
      commercial_ally_key,
    );

    if (commercial_ally.status === CommercialAllyStatus.DELETED) {
      throw new CommercialAllyDeletedException();
    }

    await this._warehouseRepo.deleteWarehouses(commercial_ally_key);

    const response = await this._commercialAllyRepo.deleteCommercialAlly(
      commercial_ally_key,
    );

    this._appLogger.log('Commercial Ally has been deleted sucessfully');

    return response;
  }

  async getWarehouses(
    commercial_ally_key: string,
  ): Promise<WarehousesInfoDto[]> {
    this._appLogger.log(
      'Handling New Request: Consulting Commercial Allies Warehouses Service',
    );

    await this.validateCommercialAlly(commercial_ally_key);

    const warehouses: Warehouse[] = await this._warehouseRepo.getWarehousesByCommercialAlly(
      commercial_ally_key,
    );

    const warehousesInfo: WarehousesInfoDto[] = [];

    warehouses.forEach(wh => {
      warehousesInfo.push(MapperWarehouse.warehouseToWarehousesInfo(wh));
    });

    this._appLogger.log(
      'Commercial Allies Warehouses has been consulted sucessfully',
    );

    return warehousesInfo;
  }

  async getPickups(commercial_ally_key: string): Promise<PickupsInfoDto[]> {
    this._appLogger.log(
      'Handling New Request: Consulting Commercial Allies Pickups Service',
    );

    await this.validateCommercialAlly(commercial_ally_key);

    const warehouses: Warehouse[] = await this._warehouseRepo.getWarehousesByCommercialAlly(
      commercial_ally_key,
    );
    const wrh: number[] = [];
    warehouses.map(warehouse => wrh.push(warehouse.warehouse_id));

    const pickupsInfo: PickupsInfoDto[] = [];

    const pickups: Pickup[] = await this._pickupRepo.getCommercialAllyPickups(
      wrh,
    );

    pickups.map(pickup =>
      pickupsInfo.push(MapperPickup.pickupToPickupsInfo(pickup)),
    );

    this._appLogger.log(
      'Commercial Allies Pickups has been consulted sucessfully',
    );

    return pickupsInfo;
  }

  private async validateCommercialAlly(
    commercial_ally_key: string,
  ): Promise<CommercialAlly> {
    const commercialAlly: CommercialAlly = await this._commercialAllyRepo.getCommercialAllyById(
      commercial_ally_key,
    );
    if (!commercialAlly) throw new CommercialAllyNotFoundException();
    return commercialAlly;
  }

  private async validateAddress(address: string): Promise<Place> {
    const factory: IDaoFactory = new DaoLocationFactory();
    const locator: IDaoLocation = factory.factoryMethod(
      DaoFactoryConstans.LOCATIONIQ,
    );
    const place: Place = await locator.validateAddress(address);
    if (!place) throw new InvalidAddressException();
    return place;
  }

  private async validateWarehouse(id: number): Promise<Warehouse> {
    const warehouse: Warehouse = await this._warehouseRepo.getWarehouseById(id);
    if (!warehouse) throw new WarehouseNotFoundException();
    if (warehouse.status === WarehouseStatus.DELETED)
      throw new WarehouseDeletedException();
    return warehouse;
  }

  async updateWarehouse(
    id: number,
    newWarehouse: UpdateWarehouseDto,
  ): Promise<any> {
    this._appLogger.log('Handling New Request: Update Warehouse Service');

    await this.validateWarehouse(id);

    if (newWarehouse.address) {
      const place: Place = await this.validateAddress(newWarehouse.address);
      await this._placeRepo.createPlace(place);
      newWarehouse.place = place;
    }

    const response = await this._warehouseRepo.updateWarehouse(
      id,
      newWarehouse,
    );

    this._appLogger.log('Warehouse has been updated sucessfully');

    return response;
  }

  async deleteWarehouse(id: number): Promise<any> {
    this._appLogger.log('Handling New Request: Delete Warehouse Service');

    await this.validateWarehouse(id);

    const response = await this._warehouseRepo.deleteWarehouse(id);

    this._appLogger.log('Warehouse has been deleted sucessfully');

    return response;
  }
}
