import { OrderResumeDto } from './dto/order-resume.dto';
import { MapperOrderResume } from './../../mapper/mapper-order-resume';
import { BillDto } from './dto/bill.dto';
import { DiscPerRepository } from './../discount/repositories/disc-per.repository';
import { DiscPer } from './../discount/entities/disc-per.entity';
import { CharPriceHist } from './../item-type/entities/char-price-hist.entity';
import { ReceiverNotFoundException } from './../../common/exceptions/receiver-not-found.exception';
import { ReceiverRepository } from './../userdata/repositories/receiver.repository';
import { isArray } from 'util';
import { Characteristic } from './../item-type/entities/characteristic.entity';
import { CharacteristicRepository } from './../item-type/repositories/characteristic.repository';
import { IDaoLocation } from './../dao/interfaces/dao-location.interface';
import { DaoLocationFactory } from './../dao/factories/dao-location-factory';
import { IDaoFactory } from './../dao/factories/interface/IDaofactory.interface';
import { Office } from './../office/entities/office.entity';
import { OfficeReposiroty } from './../office/repositories/office.repository';
import { OrderHistoryDto } from './dto/order-history.dto';
import { Trajectory } from './entities/trajectory.entity';
import { Place } from './entities/place.entity';
import { OrderPriceHist } from '../order-type/entities/order-price-hist.entity';
import { OrdersheetRepository } from './repositories/ordersheet.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrdersheetDto } from './dto/create-ordersheet.dto';
import { Userdata } from '../userdata/entities/userdata.entity';
import { UserDataRepository } from '../userdata/repositories/userdata.repository';
import {
  UserNotFoundException,
  OfficeNotFoundException,
  EmptyDestinationException,
  OrderPriceHistNotFoundException,
  BadItemStructureException,
  OrdersheetNotFoundException,
  InvalidAddressException,
  InvalidReceiverException,
  LocatorConectionException,
  DiscountNotFoundException,
  InvalidDiscountException,
} from 'src/common/exceptions';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPriceHistRepository } from '../order-type/repositories/order-price-hist.repository';
import { Ordersheet } from './entities/ordersheet.entity';
import { OrdersheetStatus } from './constants/ordersheet-status.enum';
import { AppLoggerService } from 'src/log/applogger.service';
import { OrderDetailDto } from './dto/order-detail.dto';
import { OrdersDetailsDto } from './dto/orders-details.dto';
import { TotalsDto } from './dto/orders-totals.dto';
import { MapperOrder } from '../../mapper/mapper-order';
import { DaoFactoryConstans } from '../dao/factories/constants/dao-factory-constants.enum';
import { Receiver } from '../userdata/entities/receiver.entity';
import { ItemPriceHistRepository } from '../item-type/repositories/item-price-hist.repository';
import { ItemPriceHist } from '../item-type/entities/item-price-hist.entity';
import { MapperBill } from 'src/mapper/mapper-bill';
import { Response } from 'express';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrdersheetService {
  constructor(
    @InjectRepository(OrdersheetRepository)
    private readonly _ordersheetRepo: OrdersheetRepository,
    @InjectRepository(UserDataRepository)
    private readonly _userRepo: UserDataRepository,
    @InjectRepository(OfficeReposiroty)
    private readonly _officeRepo: OfficeReposiroty,
    @InjectRepository(OrderPriceHistRepository)
    private readonly _orderPriceRepo: OrderPriceHistRepository,
    @InjectRepository(CharacteristicRepository)
    private readonly _charRepo: CharacteristicRepository,
    @InjectRepository(ReceiverRepository)
    private readonly _receiverRepo: ReceiverRepository,
    @InjectRepository(DiscPerRepository)
    private readonly _discountRepo: DiscPerRepository,
    @InjectRepository(ItemPriceHistRepository)
    private readonly _itemPriceRepo: ItemPriceHistRepository,
    private readonly _appLogger: AppLoggerService,
    private readonly _emailService: EmailService,
  ) {}

  async addressConfirmation(address: string): Promise<Place> {
    this._appLogger.log('Handling New Request: Address Validation Service');
    return this.validateAddress(address);
  }

  async calculateOrder(order: CreateOrdersheetDto): Promise<any> {
    this._appLogger.log('Handling New Request: order bill calculation Service');
    const new_order: Ordersheet = await this.validateOrder(order);
    this.setPricesOnOrder(new_order);
    return this.generateBill(new_order);
  }

  async registerOrder(order: CreateOrdersheetDto, res: Response): Promise<any> {
    this._appLogger.log('Handling New Request: order registration Service');
    const new_order: Ordersheet = await this.validateOrder(order);
    this.setPricesOnOrder(new_order);
    const saved_order = await this._ordersheetRepo.registerOrder(new_order);
    const bill = this.generateBill(saved_order);
    this._emailService.generateInvoice(bill, res, 'order');
    return bill;
  }

  async consultBill(tracking_id: string): Promise<BillDto> {
    this._appLogger.log('Handling New Request: order bill consulting Service');
    const order: Ordersheet = await this._ordersheetRepo.fetchOrder(
      tracking_id,
    );
    if (!order) throw new OrdersheetNotFoundException();
    return this.generateBill(order);
  }

  private generateBill(order: Ordersheet): BillDto {
    return MapperBill.generateBillFromOrder(order);
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

  private setPricesOnOrder(order: Ordersheet): void {
    const distance_km: number = Number(order.trajectories.distance) / 1000;
    const base_price = Number(order.item_price_hist.base_price);
    const price_gr_km: number = Number(order.item_price_hist.price_km) / 1000;

    let order_base_cost = 0;

    order.items.map(item => {
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
      order_base_cost += Number(item_cost.toFixed(2));
    });

    let order_total_tax = Number(order.order_price_hist.time_tax);
    order_total_tax += order.ignore_holidays
      ? Number(order.order_price_hist.holidays_tax)
      : 0;
    order_total_tax += order.destination_place
      ? Number(order.order_price_hist.specific_destination_tax)
      : 0;
    const tax_factor = (100 + order_total_tax) / 100;

    const discount = order.discount
      ? Number(order.discount.discount.percentage)
      : 0;
    const discount_factor = (100 - discount) / 100;

    order.facturation_amount = order_base_cost * tax_factor * discount_factor;
    order.facturation_amount = Number(order.facturation_amount.toFixed(2));
  }

  private getDimensionalWeight(item: Item): number {
    const weight: number = item.item_weight;
    const volume: number =
      (item.item_width * item.item_length * item.item_height) / 5;
    return Math.max(weight, volume);
  }

  private async getCurrentPrice(): Promise<ItemPriceHist> {
    return await this._itemPriceRepo.getCurrentPrice();
  }

  private async validateOrder(order: CreateOrdersheetDto): Promise<Ordersheet> {
    //validate user
    const user: Userdata = await this.validateUser(order.useremail);

    //valida receiver
    const receiver: Receiver = await this.validateReceiver(
      order.receiver_id,
      user.user_id,
    );

    //validate discount
    let discount: DiscPer = null;
    if (order.discount_id) {
      discount = await this.validateDiscount(order.discount_id, user.user_id);
    }

    //validate origin office
    const origin_office = await this.validateOffice(order.origin_office);

    //validate order_price_hist
    const orderPrice = await this.validateOrderType(order.order_price_hist);

    //validate destination place set
    let dest_office: Office = null;
    let dest_address: Place = null;
    if (order.destination_office) {
      dest_office = await this.validateOffice(order.destination_office);
    } else if (!order.destination_address) {
      throw new EmptyDestinationException();
    } else {
      dest_address = await this.validateAddress(order.destination_address);
    }

    //validate items
    const itemsToInsert: Item[] = await this.validateItems(order.items);

    //create ordersheet
    const newOrdersheet: Ordersheet = new Ordersheet();
    newOrdersheet.user = user;
    newOrdersheet.origin_office = origin_office;
    newOrdersheet.order_price_hist = orderPrice;
    newOrdersheet.creation_date = new Date();
    newOrdersheet.status = OrdersheetStatus.DELIVERY;
    newOrdersheet.receiver = receiver;
    newOrdersheet.ignore_holidays = order.ignore_holidays;
    newOrdersheet.destination_office = dest_office;
    newOrdersheet.destination_place = dest_address;
    newOrdersheet.discount = discount;
    newOrdersheet.item_price_hist = await this.getCurrentPrice();

    //items
    newOrdersheet.items = itemsToInsert;

    //create trajectory
    const orderRoute: Trajectory = await this.generateTrajectory(
      origin_office,
      dest_address,
      dest_office,
    );

    //Insert  trajectory into ordersheet
    newOrdersheet.trajectories = orderRoute;

    return newOrdersheet;
  }

  async searchHistoryBill(data: OrderHistoryDto): Promise<OrderResumeDto[]> {
    this._appLogger.log('Search user history bills service');
    const user: Userdata = await this.validateUser(data.useremail);
    const generated_orders: Ordersheet[] = await this._ordersheetRepo.getUserHistory(
      user,
    );
    const order_history: OrderResumeDto[] = [];
    generated_orders.map(order => {
      const order_resume = MapperOrderResume.generateOrderResumeFromOrdersheet(
        order,
      );
      order_resume.trajectory = null;
      order_history.push(order_resume);
    });

    return order_history;
  }

  async searchHistoryOrder(data: OrderHistoryDto): Promise<any> {
    this._appLogger.log('Search user history orders service');
    const user: Userdata = await this.validateUser(data.useremail);
    const order_history: Ordersheet[] = await this._ordersheetRepo.getUserHistory(
      user,
    );

    order_history.map(a => {
      delete a.user;
      delete a.trajectories.check_points;
      delete a.receiver.user;
    });

    return order_history;
  }

  async gelAllOrders(): Promise<OrdersDetailsDto[]> {
    const orders: Ordersheet[] = await this._ordersheetRepo.getAllOrders();
    const ordersInfo: OrdersDetailsDto[] = [];

    orders.forEach(order => {
      ordersInfo.push(MapperOrder.ordersheetToOrderDetails(order));
    });

    return ordersInfo;
  }

  async gelAllOrdersTotal(): Promise<TotalsDto> {
    const ordersTotal: Ordersheet[] = await this._ordersheetRepo.getAllOrders();
    const ordersDeliveryTotal: Ordersheet[] = [];
    const ordersInTransitTotal: Ordersheet[] = [];
    const ordersDeliveredTotal: Ordersheet[] = [];

    ordersTotal.forEach(order => {
      if (order.status == OrdersheetStatus.DELIVERY) {
        ordersDeliveryTotal.push(order);
      } else if (order.status == OrdersheetStatus.TRANSIT) {
        ordersInTransitTotal.push(order);
      } else if (order.status == OrdersheetStatus.DELIVERED) {
        ordersDeliveredTotal.push(order);
      }
    });

    const Totals = new TotalsDto();

    Totals.delivery = ordersDeliveryTotal.length;
    Totals.inTransit = ordersInTransitTotal.length;
    Totals.delivered = ordersDeliveredTotal.length;
    Totals.total = ordersTotal.length;

    return Totals;
  }

  async searchOrdersheetDetail(orderDetail: OrderDetailDto): Promise<any> {
    this._appLogger.log('Handling New Request: Search order Detail service');
    const order: Ordersheet = await this.validateExistingOrdersheet(
      orderDetail.tracking_id,
    );
    return MapperOrderResume.generateOrderResumeFromOrdersheet(order);
  }

  private async validateExistingOrdersheet(id: string): Promise<Ordersheet> {
    const order: Ordersheet = await this._ordersheetRepo.fetchOrder(id);

    if (!order) {
      throw new OrdersheetNotFoundException();
    }
    return order;
  }

  private async validateUser(useremail: string): Promise<Userdata> {
    const user: Userdata = await this._userRepo.fetchUser(useremail);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  private async validateOffice(office_id: number): Promise<Office> {
    const office: Office = await this._officeRepo.fetchOffice(office_id);
    if (!office) throw new OfficeNotFoundException();
    return office;
  }

  private async validateOrderType(
    order_price_id: number,
  ): Promise<OrderPriceHist> {
    const orderPrice = await this._orderPriceRepo.fetchOrderPriceHist(
      order_price_id,
    );
    if (!orderPrice) throw new OrderPriceHistNotFoundException();
    return orderPrice;
  }

  private async validateReceiver(
    receiver_id: number,
    user_id: number,
  ): Promise<Receiver> {
    const receiver: Receiver = await this._receiverRepo.getReceiver(
      receiver_id,
    );
    if (!receiver) throw new ReceiverNotFoundException();
    if (receiver.user.user_id !== user_id) throw new InvalidReceiverException();
    return receiver;
  }

  private async generateTrajectory(
    origin_office: Office,
    dest_place: Place,
    dest_office: Office,
  ): Promise<Trajectory> {
    const origin = { long: null, lat: null };
    const destination = { long: null, lat: null };

    origin.long = origin_office.place.position_long;
    origin.lat = origin_office.place.position_lat;
    if (!dest_office) {
      destination.long = dest_place.position_long;
      destination.lat = dest_place.position_lat;
    } else {
      destination.long = dest_office.place.position_long;
      destination.lat = dest_office.place.position_lat;
    }

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

  private async validateDiscount(discount_id: number, user_id: number) {
    const discPer: DiscPer = await this._discountRepo.validateDiscount(
      discount_id,
      user_id,
    );

    if (!discPer) throw new DiscountNotFoundException();
    if (
      discPer.ordersheet ||
      new Date(discPer.expiration_date).getTime() < new Date().getTime()
    )
      throw new InvalidDiscountException();

    return discPer;
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
}
