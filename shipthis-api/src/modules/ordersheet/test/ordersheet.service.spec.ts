import { Test, TestingModule } from '@nestjs/testing';
import { OrdersheetService } from '../ordersheet.service';
import { ordersheetMockModuleMetadata } from './mocks/ordersheet.mock';
import { OrdersheetRepository } from '../repositories/ordersheet.repository';
import { UserDataRepository } from '../../userdata/repositories/userdata.repository';
import { OfficeReposiroty } from '../../office/repositories/office.repository';
import { OrderPriceHistRepository } from '../../order-type/repositories/order-price-hist.repository';
import { CharacteristicRepository } from '../../item-type/repositories/characteristic.repository';
import { ReceiverRepository } from '../../userdata/repositories/receiver.repository';
import { ItemPriceHistRepository } from '../../item-type/repositories/item-price-hist.repository';
import { order, response, registeredOrder } from './mocks/constants';
import { CharPriceHist } from '../../item-type/entities/char-price-hist.entity';
import { UserdataMock } from '../../userdata/test/mocks/userdata.mock';
import { ReceiverMock } from '../../userdata/test/mocks/receiver.mock';
import { DiscPerRepository } from '../../discount/repositories/disc-per.repository';
import { fetchAssignedDiscoustCreateQueryBuilder } from '../../discount/test/mocks/disc-per.mock';
import { OfficeMock } from '../../office/test/mocks/office.mock';
import { OrderPriceMock } from '../../order-type/test/mocks/order-type.mock';
import { createQueryBuilder } from '../../commercial-ally/test/mocks/commercial-ally.mock';
import { ItemPriceMock } from '../../item-type/test/mocks/item-price.mock';
import axios from 'axios';
import { LocationMock } from '../../dao/mocks/location.mock';

describe('OrdersheetService', () => {
  let service: OrdersheetService;
  let ordersheetRepo: OrdersheetRepository;
  let userRepo: UserDataRepository;
  let officeRepo: OfficeReposiroty;
  let orderPriceRepo: OrderPriceHistRepository;
  let charRepo: CharacteristicRepository;
  let receiverRepo: ReceiverRepository;
  let itemRepo: ItemPriceHistRepository;
  let discPerRepository: DiscPerRepository;
  const userRepoMock: UserdataMock = new UserdataMock();
  const receiverRepoMock: ReceiverMock = new ReceiverMock();
  const officeRepoMock: OfficeMock = new OfficeMock();
  const orderPriceRepoMock: OrderPriceMock = new OrderPriceMock();
  const itemPriceRepoMock: ItemPriceMock = new ItemPriceMock();
  const locationMock: LocationMock = new LocationMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      ordersheetMockModuleMetadata,
    ).compile();

    service = module.get<OrdersheetService>(OrdersheetService);
    ordersheetRepo = module.get<OrdersheetRepository>(OrdersheetRepository);
    userRepo = module.get<UserDataRepository>(UserDataRepository);
    officeRepo = module.get<OfficeReposiroty>(OfficeReposiroty);
    orderPriceRepo = module.get<OrderPriceHistRepository>(
      OrderPriceHistRepository,
    );
    charRepo = module.get<CharacteristicRepository>(CharacteristicRepository);
    receiverRepo = module.get<ReceiverRepository>(ReceiverRepository);
    itemRepo = module.get<ItemPriceHistRepository>(ItemPriceHistRepository);
    discPerRepository = module.get<DiscPerRepository>(DiscPerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate order data', async () => {
    order.items[0].characteristics[0].characteristic_id = 1;
    order.items[0].characteristics[1].characteristic_id = 2;
    order.items[0].characteristics[1].char_price_hists = [new CharPriceHist()];
    order.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

    userRepo.findOne = userRepoMock.findOne(false, true);
    receiverRepo.findOne = receiverRepoMock.findOne('Active');
    jest
      .spyOn(discPerRepository, 'createQueryBuilder')
      .mockImplementation(() => fetchAssignedDiscoustCreateQueryBuilder);
    officeRepo.findOne = officeRepoMock.findOne();
    orderPriceRepo.findOne = orderPriceRepoMock.findOne();
    jest
      .spyOn(charRepo, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);
    itemRepo.findOne = itemPriceRepoMock.findOne()
    axios.get = locationMock.get();
    await service.calculateOrder(order);
  });

  it('should register order data', async () => {
    order.items[0].characteristics[0].characteristic_id = 1;
    order.items[0].characteristics[1].characteristic_id = 2;
    order.items[0].characteristics[1].char_price_hists = [new CharPriceHist()];
    order.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

    userRepo.findOne = userRepoMock.findOne(false, true);
    receiverRepo.findOne = receiverRepoMock.findOne('Active');
    jest
      .spyOn(discPerRepository, 'createQueryBuilder')
      .mockImplementation(() => fetchAssignedDiscoustCreateQueryBuilder);
    officeRepo.findOne = officeRepoMock.findOne();
    orderPriceRepo.findOne = orderPriceRepoMock.findOne();
    jest
      .spyOn(charRepo, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);
    itemRepo.findOne = itemPriceRepoMock.findOne();
    axios.get = locationMock.get();
    ordersheetRepo.save = jest.fn().mockResolvedValue(registeredOrder);
    await service.registerOrder(order, response);
  });

  it('should consult bill', () => {
    ordersheetRepo.findOne = jest.fn().mockResolvedValue(registeredOrder);
    service.consultBill(order.tracking_id);
  });
});
