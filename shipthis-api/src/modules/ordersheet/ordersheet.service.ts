import { OrderHistoryDto } from './dto/order-history.dto';
import { UserAlreadyRegisteredException } from 'src/common/exceptions/user-already-registered.exception';
import { CheckPointRepository } from './../check-point/check-point.repository';
import { TrajectoryRepository } from './../trajectory/trajectory.repository';
import { Trajectory } from './../trajectory/trajectory.entity';
import { ItemRepository } from './../item/item.repository';
import { Place } from './../place/place.entity';
import { OrderPriceHist } from './../order-price-hist/order-price-hist.entity';
import { OrdersheetRepository } from './ordersheet.repository';
import { ItemPriceHistRepository } from './../item-price-hist/item-price-hist.repository';
import { OfficeReposiroty } from './../office/office.repository';
import { Office } from './../office/office.entity';
import { getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOrdersheetDto } from './dto/create-ordersheet.dto';
import { Userdata } from '../userdata/userdata.entity';
import { UserDataRepository } from '../userdata/userdata.repository';
import {
  UserNotFoundException,
  OfficeNotFoundException,
  EmptyDestinationException,
  OrderPriceHistNotFoundException,
  ItemPriceHistNotFoundException,
  BadItemStructureException,
  OrdersheetNotFoundException,
} from 'src/common/exceptions';
import { OfficeStatus } from '../office/constants/office-status.enum';
import { UserdataStatus } from '../userdata/constants/user-status.enum';
import { Item } from '../item/item.entity';
import { ItemPriceHist } from '../item-price-hist/item-price-hist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPriceHistRepository } from '../order-price-hist/order-price-hist.repository';
import { Ordersheet } from './ordersheet.entity';
import { OrdersheetStatus } from './constants/ordersheet-status.enum';
import { async } from 'rxjs/internal/scheduler/async';
import { CheckPoint } from '../check-point/check-point.entity';
import { validate } from 'class-validator';
import { AppLoggerService } from 'src/log/applogger.service';
import { OrderDetailDto } from './dto/order-detail.dto';

@Injectable()
export class OrdersheetService {
  constructor(
    @InjectRepository(OrdersheetRepository)
    private readonly _ordersheetRepo: OrdersheetRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async createOrdersheet(order: CreateOrdersheetDto): Promise<any> {
    this._appLogger.log('Create ordersheet service');
    //validade user
    const user: Userdata = await this.validateUser(order.useremail);

    //validate origin office
    const officeRepo: OfficeReposiroty = await getConnection().getRepository(
      Office,
    );
    const origin_office = await officeRepo.findOne({
      where: {
        office_id: order.origin_office,
        status: OfficeStatus.ACTIVE,
      },
    });
    if (!origin_office) {
      this._appLogger.log('Error creating ordersheet: Origin office not found');
      throw new OfficeNotFoundException();
    }

    //validate order_price_hist
    const orderPriceHistRepo: OrderPriceHistRepository = await getConnection().getRepository(
      OrderPriceHist,
    );
    const orderPrice = await orderPriceHistRepo.findOne({
      where: {
        order_price_hist_id: order.order_price_hist,
        ending_date: null,
      },
    });
    if (!orderPrice) {
      this._appLogger.log(
        'Error creating ordersheet: Order type hist movement not found',
      );
      throw new OrderPriceHistNotFoundException();
    }

    //validate destination place set
    let dest_office: Office;
    if (order.destination_office) {
      dest_office = await officeRepo.findOne({
        where: {
          office_id: order.destination_office,
          status: OfficeStatus.ACTIVE,
        },
      });
      if (!dest_office) {
        this._appLogger.log('Error creating ordersheet: Destination not found');
        throw new OfficeNotFoundException();
      }
    } else if (!order.destination_address) {
      this._appLogger.log(
        'Error creating ordersheet: Destination addres empty',
      );
      throw new EmptyDestinationException();
    }

    //validate items
    let itemsToInsert: Item[] = [];
    const itemPriceRepo: ItemPriceHistRepository = await getConnection().getRepository(
      ItemPriceHist,
    );
    let newItem: Item;
    for await (const item of order.items) {
      if (typeof item.item_type_hist !== 'number') {
        this._appLogger.log(
          'Error creating ordersheet: Bad structure for items array',
        );
        throw new BadItemStructureException();
      }
      let itemPrice: ItemPriceHist = await itemPriceRepo.findOne({
        where: { item_price_hist_id: item.item_type_hist, ending_date: null },
      });
      if (!itemPrice) {
        this._appLogger.log(
          'Error creating ordersheet: Item price hist movement not found',
        );
        throw new ItemPriceHistNotFoundException();
      }
      newItem = new Item();
      newItem.item_weight = item.item_weight;
      newItem.item_volumen = item.item_volumen;
      newItem.is_fragile = item.is_fragile;
      newItem.is_insured = item.is_insured;
      newItem.item_type_hist = itemPrice;
      itemsToInsert.push(newItem);
    }

    //create ordersheet
    const newOrdersheet: Ordersheet = new Ordersheet();
    newOrdersheet.user = user;
    newOrdersheet.origin_office = origin_office;
    newOrdersheet.order_price_hist = orderPrice;
    newOrdersheet.creation_date = new Date();
    newOrdersheet.status = OrdersheetStatus.GENERATED;
    newOrdersheet.rec_fullname = order.rec_fullname;
    newOrdersheet.rec_phone_code = order.rec_phone_code;
    newOrdersheet.rec_phone_number = order.rec_phone_number;
    newOrdersheet.rec_document = order.rec_document;
    newOrdersheet.rec_email = order.rec_email;
    newOrdersheet.ignore_hollydays = order.ignore_hollydays;
    if (dest_office) {
      newOrdersheet.destination_office = dest_office;
    } else {
      const dest_place = new Place();
      dest_place.address = order.destination_address;
      newOrdersheet.destination_place = dest_place;
    }
    //items
    newOrdersheet.items = itemsToInsert;
    //create trajectory
    const orderRoute: Trajectory = new Trajectory();
    orderRoute.linear_distance = Math.floor(90 + Math.random() * 700);
    orderRoute.efective_distance = Math.floor(orderRoute.linear_distance * 1.2);
    //check-point
    const cpArray: CheckPoint[] = [];
    let cpPlace: Place;
    let cpCheckPoint: CheckPoint;
    const cpnumber: number = Math.floor(3 + Math.random() * 2);
    for (const step of Array(cpnumber).keys()) {
      cpPlace = new Place();
      cpPlace.address = `Check point ${step + 1} St.`;
      cpCheckPoint = new CheckPoint();
      cpCheckPoint.place = cpPlace;
      cpCheckPoint.check_point_order = step + 1;
      cpArray.push(cpCheckPoint);
    }
    //Insert check-points into trajectory
    orderRoute.check_points = cpArray;
    //Insert  trajectory into ordersheet
    newOrdersheet.trajectories = orderRoute;
    //register ordersheet
    const savedOrdersheet: Ordersheet = await this._ordersheetRepo.save(
      newOrdersheet,
    );
    this._appLogger.log(
      `New order created successfuly with ID = ${savedOrdersheet.ordersheet_id}`,
    );
    savedOrdersheet.user.password = '';
    return { response: 'Order Registered successfully' };
  }

  async searchHistory(info: OrderHistoryDto): Promise<any> {
    this._appLogger.log('Search user history orders service');
    //Validate user
    const user: Userdata = await this.validateUser(info.useremail);
    const hist: Ordersheet[] = await this._ordersheetRepo.find({
      where: { user: user },
    });

    hist.map(a => {
      delete a.user;
      delete a.trajectories.check_points;
    });

    return hist;
  }

  async searchOrdersheetDetail(orderDetail: OrderDetailDto): Promise<any> {
    this._appLogger.log('Search order Detail service');
    const order: Ordersheet = await this.validateExitingOrdersheet(
      orderDetail.tracking_id,
    );
    const person = order.user.person;
    delete order.user;
    return { person: person, ...order };
  }

  private async validateExitingOrdersheet(id: string): Promise<Ordersheet> {
    const order: Ordersheet = await this._ordersheetRepo.findOne({
      where: { ordersheet_id: id },
    });

    if (!order) {
      this._appLogger.log('Error in OrdersheetService: Ordersheet not found');
      throw new OrdersheetNotFoundException();
    }
    return order;
  }

  private async validateUser(useremail: string): Promise<Userdata> {
    //validade user
    const userdataRepo: UserDataRepository = await getConnection().getRepository(
      Userdata,
    );
    const user: Userdata = await userdataRepo.findOne({
      where: { email: useremail, status: UserdataStatus.ACTIVE },
    });

    if (!user) {
      this._appLogger.log('Error in OrdersheetService: User not found');
      throw new UserNotFoundException();
    }
    return user;
  }
}
