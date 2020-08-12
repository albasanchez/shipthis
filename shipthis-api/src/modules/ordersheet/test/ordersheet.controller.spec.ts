import { Test, TestingModule } from '@nestjs/testing';
import { OrdersheetController } from '../ordersheet.controller';
import { OrdersheetService } from '../ordersheet.service';
import { order, response, address } from './mocks/constants';

describe('Ordersheet Controller', () => {
  let controller: OrdersheetController;
  let service: OrdersheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersheetController],
      providers: [
        {
          provide: OrdersheetService,
          useFactory() {
            return {
              calculateOrder: jest.fn(),
              registerOrder: jest.fn(),
              consultBill: jest.fn(),
              searchHistoryOrder: jest.fn(),
              searchHistoryBill: jest.fn(),
              searchOrdersheetDetail: jest.fn(),
              gelAllOrders: jest.fn(),
              gelAllOrdersTotal: jest.fn(),
              addressConfirmation: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersheetController>(OrdersheetController);
    service = module.get<OrdersheetService>(OrdersheetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call calculate order service', () => {
    controller.createOrdersheet(order);
    expect(service.calculateOrder).toHaveBeenCalledWith(order);
  });

  it('should call register order service', () => {
    controller.registerOrdersheet(order, response);
    expect(service.registerOrder).toHaveBeenCalledWith(order, response);
  });

  it('should call consult bill service', () => {
    controller.consultBill(order);
    expect(service.consultBill).toHaveBeenCalledWith(order.tracking_id);
  });

  it('should call search history order service', () => {
    controller.searchHistoryOrder(order);
    expect(service.searchHistoryOrder).toHaveBeenCalledWith(order);
  });

  it('should call search history bill service', () => {
    controller.searchHistoryBill(order);
    expect(service.searchHistoryBill).toHaveBeenCalledWith(order);
  });

  it('should call search order detail service', () => {
    controller.searchOrderDetail(order);
    expect(service.searchOrdersheetDetail).toHaveBeenCalledWith(order);
  });

  it('should call get all orders service', () => {
    controller.getAllOrders();
    expect(service.gelAllOrders).toHaveBeenCalledWith();
  });

  it('should call get all orders total service', () => {
    controller.getAllOrdersTotal();
    expect(service.gelAllOrdersTotal).toHaveBeenCalledWith();
  });

  it('should call validate address service', () => {
    controller.validateAddress(address);
    expect(service.addressConfirmation).toHaveBeenCalledWith(address.address);
  });
});
