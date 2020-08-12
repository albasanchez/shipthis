import { Test, TestingModule } from '@nestjs/testing';
import { OrderTypeService } from '../order-type.service';
import {
  orderTypeMockModuleMetadata,
  createQueryBuilder,
  OrderTypeMock,
  OrderPriceMock,
} from './mocks/order-type.mock';
import { OrderTypeRepository } from '../repositories/order-type.repository';
import { updateOrderType } from './mocks/constants.mock';
import { OrderPriceHistRepository } from '../repositories/order-price-hist.repository';
import { OrderTypeNotFoundException } from '../../../common/exceptions/order-type-not-found.exception';

describe('OrderTypeService', () => {
  let service: OrderTypeService;
  let orderTypeRepository: OrderTypeRepository;
  const mockOrderTypeRepository: OrderTypeMock = new OrderTypeMock();
  let orderPriceRepository: OrderPriceHistRepository;
  const mockOrderPriceRepository: OrderPriceMock = new OrderPriceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      orderTypeMockModuleMetadata,
    ).compile();

    service = module.get<OrderTypeService>(OrderTypeService);
    orderTypeRepository = module.get<OrderTypeRepository>(OrderTypeRepository);
    orderPriceRepository = module.get<OrderPriceHistRepository>(
      OrderPriceHistRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllActiveOrdertypes', () => {
    it('should get order types', () => {
      jest
        .spyOn(orderTypeRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      service.getAllActiveOrdertypes();
      expect(orderTypeRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('updateOrderTypeHist', () => {
    it('should update order type', () => {
      orderTypeRepository.findOne = mockOrderTypeRepository.findOne(true);
      orderPriceRepository.findOne = mockOrderPriceRepository.findOne();
      orderPriceRepository.update = mockOrderPriceRepository.update();
      orderPriceRepository.save = mockOrderPriceRepository.save();
      service.updateOrderTypeHist(updateOrderType);
      expect(orderTypeRepository.findOne).toHaveBeenCalled();
    });
    it('should throw order type not found exception', async () => {
      orderTypeRepository.findOne = mockOrderTypeRepository.findOne(false);
      try {
        await service.updateOrderTypeHist(updateOrderType);
      } catch (e) {
        expect(orderTypeRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(OrderTypeNotFoundException);
      }
    });
  });
});
