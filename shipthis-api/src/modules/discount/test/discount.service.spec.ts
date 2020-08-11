import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from '../discount.service';
import {
  UserNotFoundException,
  DiscountNotRegisteredException,
  DiscountDeletedException,
  DiscountNotFoundException,
} from '../../../common/exceptions';
import {
  discountMockModuleMetadata,
  DiscountMock,
  createQueryBuilder,
} from './mocks/discount.mock';
import {
  discPerMockModuleMetadata,
  DiscPerMock,
  fetchAssignedDiscoustCreateQueryBuilder,
  validateDiscountCreateQueryBuilder,
  assignDiscountsCreateQueryBuilder
} from './mocks/disc-per.mock';
import {
  UserdataMock,
  userdataMockModuleMetadata,
} from '../../userdata/test/mocks/userdata.mock';
import { UserDataRepository } from '../../userdata/repositories/userdata.repository';
import { DiscPerRepository } from '../repositories/disc-per.repository';
import { DiscountRepository } from '../repositories/discount.repository';
import { LanguageType } from '../../userdata/constants/language.enum';
import { Userdata } from '../../userdata/entities/userdata.entity';

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

  const user = { 
    user_id: 1,  
    email: 'luisa@gmail.com', 
    status: 'ACTIVE',
    password: 'test',
    registration_date: new Date(),
    registration_type: 'REGULAR',
    person: {first_name: 'Luisa',middle_name: 'Maria', last_name: 'Contreras', 
    second_last_name: 'Lara', phone_number:'+1 (654) 562 5698', document: 'V-5614151',
    date_of_birth: new Date(), def_language: LanguageType.ENGLISH, receive_notifications: true },
    }

    const new_user = new Userdata();
    new_user.user_id = 2;
    new_user.email = 'test@gmail.com';
    new_user.status = 'ACTIVE';
    new_user.registration_date = new Date();
    new_user.registration_type = 'REGULAR';

    const data = {
      discount_id: 2,
      user_id: 1
    }

    const new_discount = { name: 'FALL', percentage: 30}


    describe('assignWelcome', () => {
      it('should assign the welcome discount to the user', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Welcome');
        discPerRepository.save = mockDiscPerRepository.save();
        await service.assignWelcomeDiscount(new_user);
        expect(discountRepository.findOne).toHaveBeenCalled();
        expect(discPerRepository.save).toHaveBeenCalled();
      });
    });

    describe('getAvaliableDiscounts', () => {
      it('should get all the Avaliable Discounts by user', async () => {
        userdataRepository.findOne = mockUserdataRepository.findOne(true, false);
        jest
        .spyOn(discPerRepository, 'createQueryBuilder')
        .mockImplementation(() => fetchAssignedDiscoustCreateQueryBuilder);
        await service.getAvaliableDiscounts(user.email);
        expect(userdataRepository.findOne).toHaveBeenCalled();
        expect(discPerRepository.createQueryBuilder).toHaveBeenCalled();
      });
      it('should not get all the Avaliable Discounts by user', async () => {
        userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
        jest
        .spyOn(discPerRepository, 'createQueryBuilder')
        .mockImplementation(() => fetchAssignedDiscoustCreateQueryBuilder);
        try {
          await service.getAvaliableDiscounts(user.email);
        } catch (e) {
          expect(userdataRepository.findOne).toHaveBeenCalled();
          expect(discPerRepository.createQueryBuilder).not.toHaveBeenCalled();
          expect(e).toBeInstanceOf(UserNotFoundException);
        }
      });
    });

    describe('getDiscountsInfo', () => {
      it('should get all the discounts ', async () => {
        discountRepository.find = mockDiscountRepository.find();
        await service.getDiscountsInfo();
        expect(discountRepository.find).toHaveBeenCalled();
      });
    });

    describe('getDiscounts', () => {
      it('should get all the discounts ', async () => {
        discountRepository.find = mockDiscountRepository.find();
        await service.getDiscounts();
        expect(discountRepository.find).toHaveBeenCalled();
      });
    });

    describe('assignDiscount', () => {
      it('should assign the welcome discount to the user', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Summer');
        userdataRepository.findOne = mockUserdataRepository.findOne(false, true);
        discPerRepository.save = mockDiscPerRepository.save();
        await service.assignDiscount(data);
        expect(discountRepository.findOne).toHaveBeenCalled();
        expect(discPerRepository.save).toHaveBeenCalled();
      });
      it('should not assign the welcome discount to the user', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Summer');
        userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
        discPerRepository.save = mockDiscPerRepository.save();
        try {
           await service.assignDiscount(data);
        } catch (e) {
          expect(discountRepository.findOne).toHaveBeenCalled();
          expect(userdataRepository.findOne).toHaveBeenCalled();
          expect(discPerRepository.save).not.toHaveBeenCalled();
          expect(e).toBeInstanceOf(UserNotFoundException);
        }
      });
      it('should not assign the welcome discount to the user', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('');
        userdataRepository.findOne = mockUserdataRepository.findOne(false, true);
        discPerRepository.save = mockDiscPerRepository.save();
        try {
           await service.assignDiscount(data);
        } catch (e) {
          expect(discountRepository.findOne).toHaveBeenCalled();
          expect(userdataRepository.findOne).not.toHaveBeenCalled();
          expect(discPerRepository.save).not.toHaveBeenCalled();
          expect(e).toBeInstanceOf(DiscountNotRegisteredException);
        }
      });
      it('should not assign the welcome discount to the user', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Deleted');
        userdataRepository.findOne = mockUserdataRepository.findOne(false, true);
        discPerRepository.save = mockDiscPerRepository.save();
        try {
           await service.assignDiscount(data);
        } catch (e) {
          expect(discountRepository.findOne).toHaveBeenCalled();
          expect(userdataRepository.findOne).not.toHaveBeenCalled();
          expect(discPerRepository.save).not.toHaveBeenCalled();
          expect(e).toBeInstanceOf(DiscountDeletedException);
        }
      });
    });  

    describe('updateDiscount', () => {
      it('should update the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Summer');
        discountRepository.update = mockDiscountRepository.update();
        const response = await service.updateDiscount(1, new_discount);
        expect(discountRepository.findOne).toHaveBeenCalled();
        expect(discountRepository.update).toHaveBeenCalled();
        expect(response).toEqual({ response: 'Discount has been updated sucessfully'});
      });
      it('should not update the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Deleted');
        discountRepository.update = mockDiscountRepository.update();
        try {
          const response = await service.updateDiscount(1, new_discount);
       } catch (e) {
         expect(discountRepository.findOne).toHaveBeenCalled();
         expect(discountRepository.update).not.toHaveBeenCalled();
         expect(e).toBeInstanceOf(DiscountDeletedException);
       }
      });
      it('should not update the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('');
        discountRepository.update = mockDiscountRepository.update();
        try {
          const response = await service.updateDiscount(1, new_discount);
       } catch (e) {
         expect(discountRepository.findOne).toHaveBeenCalled();
         expect(discountRepository.update).not.toHaveBeenCalled();
         expect(e).toBeInstanceOf(DiscountNotRegisteredException);
       }
      });
    });

    describe('deleteDiscount', () => {
      it('should delete the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Summer');
        discountRepository.update = mockDiscountRepository.update();
        const response = await service.deleteDiscount(1);
        expect(discountRepository.findOne).toHaveBeenCalled();
        expect(discountRepository.update).toHaveBeenCalled();
        expect(response).toEqual({ response: 'Discount has been deleted sucessfully'});
      });
      it('should not delete the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('Deleted');
        discountRepository.update = mockDiscountRepository.update();
        try {
          const response = await service.deleteDiscount(2);
       } catch (e) {
         expect(discountRepository.findOne).toHaveBeenCalled();
         expect(discountRepository.update).not.toHaveBeenCalled();
         expect(e).toBeInstanceOf(DiscountDeletedException);
       }
      });
      it('should not delete the discount ', async () => {
        discountRepository.findOne = mockDiscountRepository.findOne('');
        discountRepository.update = mockDiscountRepository.update();
        try {
          const response = await service.deleteDiscount(10);
       } catch (e) {
         expect(discountRepository.findOne).toHaveBeenCalled();
         expect(discountRepository.update).not.toHaveBeenCalled();
         expect(e).toBeInstanceOf(DiscountNotRegisteredException);
       }
      });
    });

    describe('createDiscount', () => {
      it('should create a new discount ', async () => {
        discountRepository.save = mockDiscountRepository.save();
        await service.createDiscount(new_discount);
        expect(discountRepository.save).toHaveBeenCalled();
      });
    });

    

});
