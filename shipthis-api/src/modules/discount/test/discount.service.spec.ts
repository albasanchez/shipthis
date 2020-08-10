import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from '../discount.service';
import {
  UserNotFoundException,
  DiscountNotRegisteredException,
  DiscountDeletedException,
} from '../../../common/exceptions';
import {
  discountMockModuleMetadata,
  DiscountMock,
  createQueryBuilder,
} from './mocks/discount.mock';
import {
  discPerMockModuleMetadata,
  DiscPerMock,
} from './mocks/disc-per.mock';
import {
  UserdataMock,
  userdataMockModuleMetadata,
} from '../../userdata/test/mocks/userdata.mock';
import { UserDataRepository } from '../../userdata/repositories/userdata.repository';
import { DiscPerRepository } from '../repositories/disc-per.repository';
import { DiscountRepository } from '../repositories/discount.repository';

describe('DiscountService', () => {
  let service: DiscountService;
  let discountRepository: DiscountRepository;
  let discPerRepository: DiscPerRepository;
  let userdataRepository: UserDataRepository;
  const mockUserdataRepository: UserdataMock = new UserdataMock();
  const mockDiscountRepository: DiscountMock = new DiscountMock();
  const mockDiscPerRepository: DiscPerMock = new DiscPerMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      discountMockModuleMetadata,
      ).compile();

    service = module.get<DiscountService>(DiscountService);
    userdataRepository = module.get<UserDataRepository>(UserDataRepository);
    discountRepository = module.get<DiscountRepository>(DiscountRepository);
    discPerRepository = module.get<DiscPerRepository>(DiscPerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userdataRepository).toBeDefined();
    expect(discountRepository).toBeDefined();
    expect(discPerRepository).toBeDefined();
  });

  const user = {};

});
