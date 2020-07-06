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
import { NewCommercialAllyDto} from './dto/new-commercial-ally.dto';
import { WarehouseInfoDto} from './dto/warehouse-info.dto';
import { PickupsInfoDto} from './dto/pickups-info.dto';
import { WarehousesInfoDto} from './dto/warehouses-info.dto';
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
   WarehouseDeletedException
 } from 'src/common/exceptions';
 import { DaoFactoryConstans } from '../dao/factories/constants/dao-factory-constants.enum';
 import { UpdateWarehouseDto } from './dto/update-warehouse.dto'
import { WarehouseStatus } from './constants/warehouse-status.enum';


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
        private readonly _appLogger: AppLoggerService,
      ) {}

      async createCommercialAlly(newCommercialAlly: NewCommercialAllyDto): Promise<NewCommercialAllyDto> {

        this._appLogger.log('Handling New Request: Creating New Commercial Ally Service');
         
        const warehouses: Warehouse[] = await this.validateWarehouses(newCommercialAlly.warehouses);

        const commercial_ally: CommercialAlly = await this._commercialAllyRepo.createNewCommercialAlly(newCommercialAlly, warehouses);
    
        this._appLogger.log('New Commercial Ally has been created sucessfully');
    
         return commercial_ally;
      } 

      private async validateWarehouses(warehouses: Warehouse[]): Promise<Warehouse[]> {
         const warehousesToInsert: Warehouse[] = [];
         
         for (const warehouse of warehouses) {
            const place: Place = await this.validateAddress(warehouse.place.address);
            warehouse.place = place;
            warehouse.status = WarehouseStatus.ACTIVE;
            warehousesToInsert.push(warehouse);
         }

         return warehousesToInsert
      }

     async createWarehouse(newWarehouse: WarehouseInfoDto): Promise<any> {

        this._appLogger.log('Handling New Request: Creating New Warehouse Service');
    
        const place: Place = await this.validateAddress(newWarehouse.address);

        const commercial_ally: CommercialAlly = await this.validateCommercialAlly(newWarehouse.commercial_ally_key);

        if (commercial_ally.status === CommercialAllyStatus.DELETED) {
           throw new CommercialAllyDeletedException();
        }

        const warehouse: Warehouse = await this._warehouseRepo.createWarehouses(newWarehouse, commercial_ally, place)

        const warehouseInfo = MapperWarehouse.warehouseToWarehouseBasicInfo(warehouse);

        this._appLogger.log('New Warehouse has been created sucessfully');
    
         return warehouseInfo;
      }

      async getAllCommercialAllies(): Promise<CommercialAllyInfoDto[]> {

         this._appLogger.log('Handling New Request: Consulting Commercial Allies Service');
   
         const commercialAllies: CommercialAlly[] = await this._commercialAllyRepo.getAllCommercialAllies();
   
         const commercialAlliesInfo: CommercialAllyInfoDto[] = [];
   
         commercialAllies.forEach(ally => {
                commercialAlliesInfo.push(
                MapperCommercialAlly.commercialAllyToCommercialAllyInfo(ally))
                });
         
         this._appLogger.log('Commercial Allies has been consulted sucessfully');
   
         return commercialAlliesInfo;
     } 

     async updateCommercialAlly(newCommercialAlly: UpdateCommercialAllyDto): Promise<any> {

      this._appLogger.log('Handling New Request: Update Commercial Ally Service');

      const commercial_ally: CommercialAlly = await this.validateCommercialAlly(newCommercialAlly.commercial_ally_key);

        if (commercial_ally.status === CommercialAllyStatus.DELETED) {
           throw new CommercialAllyDeletedException();
        }
       
      const response = this._commercialAllyRepo.updateCommercialAlly(newCommercialAlly);

      this._appLogger.log('Commercial Ally has been updated sucessfully');

      return response;
   } 

   async deleteCommercialAlly(commercial_ally_key: string): Promise<any> {

      this._appLogger.log('Handling New Request: Delete Commercial Ally Service');

      const commercial_ally: CommercialAlly = await this.validateCommercialAlly(commercial_ally_key);

      if (commercial_ally.status === CommercialAllyStatus.DELETED) {
         throw new CommercialAllyDeletedException();
      }

      this._warehouseRepo.deleteWarehouses(commercial_ally_key);

      const response = this._commercialAllyRepo.deleteCommercialAlly(commercial_ally_key);

      this._appLogger.log('Commercial Ally has been deleted sucessfully');
       
      return response;
   } 

   async getWarehouses(commercial_ally_key: string): Promise<WarehousesInfoDto[]> {

      this._appLogger.log('Handling New Request: Consulting Commercial Allies Warehouses Service');

      await this.validateCommercialAlly(commercial_ally_key);

      const warehouses: Warehouse[] = await this._warehouseRepo.getWarehousesByCommercialAlly(commercial_ally_key);

      const warehousesInfo: WarehousesInfoDto[] = [];

      warehouses.forEach(wh => {
              warehousesInfo.push(
              MapperWarehouse.warehouseToWarehousesInfo(wh))     
        });
      
      this._appLogger.log('Commercial Allies Warehouses has been consulted sucessfully');

      return warehousesInfo;
  } 

   async getPickups(commercial_ally_key: string): Promise<PickupsInfoDto[]> {

      this._appLogger.log('Handling New Request: Consulting Commercial Allies Pickups Service');

      await this.validateCommercialAlly(commercial_ally_key);

      const warehouses: Warehouse[] = await this._warehouseRepo.getWarehousesByCommercialAlly(commercial_ally_key);
      const wrh : number[] = []
      warehouses.map(warehouse => wrh.push(warehouse.warehouse_id))

      const pickupsInfo: PickupsInfoDto[] = [];

      const pickups: Pickup[] =  await this._pickupRepo.getCommercialAllyPickups(wrh);

      pickups.map(pickup => pickupsInfo.push(
         MapperPickup.pickupToPickupsInfo(pickup))
      )
     
      this._appLogger.log('Commercial Allies Pickups has been consulted sucessfully');

      return pickupsInfo;
   }


   private async validateCommercialAlly(commercial_ally_key: string): Promise<CommercialAlly> {
      const commercialAlly: CommercialAlly = await this._commercialAllyRepo.getCommercialAllyById(commercial_ally_key);
      if(!commercialAlly) throw new CommercialAllyNotFoundException();
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

    private async validateWarehouse (id: number): Promise<Warehouse> {
      const warehouse: Warehouse = await this._warehouseRepo.getWarehouseById(id);
      if(!warehouse) throw new WarehouseNotFoundException();
      if(warehouse.status === WarehouseStatus.DELETED) throw new WarehouseDeletedException();
      return warehouse;
    }

    async updateWarehouse(id: number, newWarehouse: UpdateWarehouseDto): Promise<any> {

      this._appLogger.log('Handling New Request: Update Warehouse Service');

      await this.validateWarehouse(id);

      if(newWarehouse.address){
      const place: Place = await this.validateAddress(newWarehouse.address);
      await this._placeRepo.createPlace(place);
      newWarehouse.place = place;
      } 

      const response = this._warehouseRepo.updateWarehouse(id, newWarehouse);

      this._appLogger.log('Warehouse has been updated sucessfully');

      return response;
   } 

   async deleteWarehouse(id: number): Promise<any> {

      this._appLogger.log('Handling New Request: Delete Warehouse Service');

      await this.validateWarehouse(id);

      const response = this._warehouseRepo.deleteWarehouse(id);

      this._appLogger.log('Warehouse has been deleted sucessfully');
       
      return response;
   } 

}
