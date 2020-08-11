import { Test, TestingModule } from '@nestjs/testing';
import { OrdersheetController } from "../ordersheet.controller";
import { OrdersheetService } from "../ordersheet.service";

// CONSTANS
import { newOrderSheet, res, orderDetail, orderHist, address } from "./mocks/constants";

describe('Ordersheet Controller', () => {
  let controller: OrdersheetController;
  let service: OrdersheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersheetController],
      providers: [{
          provide: OrdersheetService,
          useFactory() {
            return {
              addressConfirmation: jest.fn(),
              calculateOrder: jest.fn(),
              registerOrder: jest.fn(),
              consultBill: jest.fn(),
              searchHistoryBill: jest.fn(),
              searchHistoryOrder: jest.fn(),
              gelAllOrders: jest.fn(),
              gelAllOrdersTotal: jest.fn(),
              searchOrdersheetDetail: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersheetController>(OrdersheetController);
    service = module.get<OrdersheetService>(OrdersheetService);
  });

  it('should call create ordersheet', () => {
    controller.createOrdersheet(newOrderSheet);
    expect(service.calculateOrder).toHaveBeenCalledWith(newOrderSheet);
  });

  it('should call register ordersheet', () => {
    controller.registerOrdersheet(newOrderSheet, res);
    expect(service.registerOrder).toHaveBeenCalledWith(newOrderSheet, res);
  });

  it('should call consult bill', () => {
    controller.consultBill(orderDetail);
    expect(service.consultBill).toHaveBeenCalledWith(orderDetail.tracking_id);
  });

  it('should call search history order', () => {
    controller.searchHistoryOrder(orderHist);
    expect(service.searchHistoryOrder).toHaveBeenCalledWith(orderHist);
  });

  it('should call search history bill', () => {
    controller.searchHistoryBill(orderHist);
    expect(service.searchHistoryBill).toHaveBeenCalledWith(orderHist);
  });

  it('should call search order detail', () => {
    controller.searchOrderDetail(orderDetail);
    expect(service.searchOrdersheetDetail).toHaveBeenCalledWith(orderDetail);
  });

  it('should call get all orders', () => {
    controller.getAllOrders();
    expect(service.gelAllOrders).toHaveBeenCalled();
  });

  it('should call get all orders total', () => {
    controller.getAllOrdersTotal();
    expect(service.gelAllOrdersTotal).toHaveBeenCalled();
  });

  it('should call validate address', () => {
    controller.validateAddress(address);
    expect(service.addressConfirmation).toHaveBeenCalledWith(address.address);
  });
});
