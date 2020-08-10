import { Test, TestingModule } from '@nestjs/testing';
import { UserdataService } from '../userdata.service';
import { ReceiverRepository } from '../repositories/receiver.repository';
import { UserDataRepository } from '../repositories/userdata.repository';
import { ReceiverNotFoundException, 
         UserNotFoundException,
         WrongCredentialsException } from '../../../common/exceptions';
import {
  UserdataMock,
  userdataMockModuleMetadata,
} from './mocks/userdata.mock';
import {
  ReceiverMock,
  receiverMockModuleMetadata,
} from './mocks/receiver.mock';
import { LanguageType } from '../constants/language.enum';
import { UserdataStatus } from '../constants/user-status.enum';
import { BadRequestException } from '@nestjs/common';


describe('UserdataService', () => {
  let service: UserdataService;
  let userdataRepository: UserDataRepository;
  let receiverRepository: ReceiverRepository;
  const mockUserdataRepository: UserdataMock = new UserdataMock();
  const mockReceiverRepository: ReceiverMock = new ReceiverMock();

  const receivers = [{ name: 'Ana', 
                     last_name: 'Lopez',
                     phone_number:'+1 (654) 562 5698', 
                     email: 'analopez1998@gmail.com',
                     user_fk: 1 },
                    
                     { name: 'Paola', 
                     last_name: 'Lopez',
                     phone_number:'+1 (654) 135 5698', 
                     email: 'paolopez1998@gmail.com',
                     user_fk: 1 }];

  const newReceiver = { name: 'Laura', 
                     last_name: 'Ledezma',
                     phone_number:'+1 (654) 562 5698', 
                     email: 'laura1998@gmail.com',
                     user_fk: 1 }

  const receiverUpdated = { name: 'Laura', 
                     last_name: 'Torres',
                     phone_number:'+1 (654) 562 5698', 
                     email: 'laura1998@gmail.com'}

  const user =    { user_id:1, first_name: 'Luisa', 
                     middle_name: 'Maria', last_name: 'Contreras', 
                     second_last_name: 'Lara', phone_number:'+1 (654) 562 5698', 
                     def_language: LanguageType.ENGLISH, picture_url: null,  
                     receive_notifications: true};

  const newPassword = { user_id: 1, actual_password: 'test', new_password:'testPassword' };
  const newPasswordFail = { user_id: 1, actual_password: 'testFail', new_password:'testPassword' };

   beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      userdataMockModuleMetadata,
    ).compile();

    service = module.get<UserdataService>(UserdataService);
    userdataRepository = module.get<UserDataRepository>(UserDataRepository);
    receiverRepository = module.get<ReceiverRepository>(ReceiverRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userdataRepository).toBeDefined();
    expect(receiverRepository).toBeDefined();
  });

  describe('getReceivers', () => {
    it('should get all the receivers by user', async () => {
      receiverRepository.find = mockReceiverRepository.find();
      service.getReceivers(user.user_id);
      expect(receiverRepository.find).toHaveBeenCalled();
    });
    it('should not get all the receivers by user', async () => {
      receiverRepository.find = mockReceiverRepository.find();
      try {
        await service.getReceivers(null);
      } catch (e) {
        expect(receiverRepository.find).not.toHaveBeenCalled( );
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('createReceiver', () => {
    it('should save a new receiver in the database', async () => {
      receiverRepository.save = mockReceiverRepository.save();
      userdataRepository.findOne = mockUserdataRepository.findOne(true, false);
      await service.createReceiver(newReceiver);
      expect(receiverRepository.save).toHaveBeenCalled();
    });
    it('should not save a new receiver in the database', async () => {
      receiverRepository.save = mockReceiverRepository.save();
      userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
      try {
        await service.createReceiver(newReceiver);
      } catch (e) {
        expect(userdataRepository.findOne).toHaveBeenCalled( );
        expect(receiverRepository.save).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('updateReceiver', () => {
    it('should update a receiver', async () => {
      receiverRepository.findOne = mockReceiverRepository.findOne('Active');
      receiverRepository.update = mockReceiverRepository.update();
      const response = await service.updateReceiver(1, receiverUpdated);
      expect(receiverRepository.findOne).toHaveBeenCalled();
      expect(receiverRepository.update).toHaveBeenCalled();
      expect(response).toEqual({ response: 'Receiver has been updated sucessfully' });
    });
    it('should not update a receiver', async () => {
      receiverRepository.findOne = mockReceiverRepository.findOne(null);
      receiverRepository.update = mockReceiverRepository.update();
      try {
        await service.updateReceiver(2, receiverUpdated);
      } catch (e) {
        expect(receiverRepository.findOne).toHaveBeenCalled( );
        expect(receiverRepository.update).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(ReceiverNotFoundException);
      }
    });
  });

  describe('deleteReceiver', () => {
    it('should delete a receiver', async () => {
      receiverRepository.findOne = mockReceiverRepository.findOne('Active');
      receiverRepository.update = mockReceiverRepository.update();
      const response = await service.deleteReceiver(1);
      expect(receiverRepository.findOne).toHaveBeenCalled();
      expect(receiverRepository.update).toHaveBeenCalled();
      expect(response).toEqual({ response: 'Receiver has been deleted sucessfully' });
    });
    it('should not delete a receiver', async () => {
      receiverRepository.findOne = mockReceiverRepository.findOne(null);
      receiverRepository.update = mockReceiverRepository.update();
      try {
        await service.deleteReceiver(2);
      } catch (e) {
        expect(receiverRepository.findOne).toHaveBeenCalled( );
        expect(receiverRepository.update).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(ReceiverNotFoundException);
      }
    });
  });

  describe('getAllUsersInfo', () => {
    it('should get all the users in the database', async () => {
      userdataRepository.find = mockUserdataRepository.find(true);
      await service.getAllUsersInfo();
      expect(userdataRepository.find).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete an user', async () => {
      userdataRepository.findOne = mockUserdataRepository.findOne(true, false);
      userdataRepository.save = mockUserdataRepository.save();
      const response = await service.deleteUser(1);
      expect(userdataRepository.findOne).toHaveBeenCalled();
      expect(userdataRepository.save).toHaveBeenCalled();
      expect(response).toEqual({ response: 'User has been deleted sucessfully' });
    });
    it('should not delete an user', async () => {
      userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
      userdataRepository.save = mockUserdataRepository.save();
      try {
        await service.deleteUser(2);
      } catch (e) {
        expect(userdataRepository.findOne).toHaveBeenCalled( );
        expect(userdataRepository.save).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('modifyPassword', () => {
   /* it('should change the user password', async () => {
      userdataRepository.findOne = mockUserdataRepository.findOne(true, false);
      userdataRepository.save = mockUserdataRepository.save();
      const response = await service.modifyPassword(newPassword);
      expect(userdataRepository.findOne).toHaveBeenCalled();
      expect(userdataRepository.save).toHaveBeenCalled();
      expect(response).toEqual({ response: 'Password change successful' });
    });*/
    it('should not change the user password', async () => {
      userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
      userdataRepository.save = mockUserdataRepository.save();
      try {
        await service.modifyPassword(newPassword);
      } catch (e) {
        expect(userdataRepository.findOne).toHaveBeenCalled( );
        expect(userdataRepository.save).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
    it('should not change the user password', async () => {
      userdataRepository.findOne = mockUserdataRepository.findOne(true, false);
      userdataRepository.save = mockUserdataRepository.save();
      try {
        await service.modifyPassword(newPasswordFail);
      } catch (e) {
        expect(userdataRepository.findOne).toHaveBeenCalled( );
        expect(userdataRepository.save).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(WrongCredentialsException);
      }
    });
  });


  describe('modifyUserdata', () => {
       it('should change the user information', async () => {
       userdataRepository.findOne = mockUserdataRepository.findOne( false,true);
       userdataRepository.save = mockUserdataRepository.save();
       await service.modifyUserdata(user);
       expect(userdataRepository.findOne).toHaveBeenCalled();
       expect(userdataRepository.save).toHaveBeenCalled();
     });
     it('should not change the user information', async () => {
       userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
       userdataRepository.save = mockUserdataRepository.save();
       try {
         await service.modifyUserdata(user);
       } catch (e) {
         expect(userdataRepository.findOne).toHaveBeenCalled( );
         expect(userdataRepository.save).not.toHaveBeenCalled();
         expect(e).toBeInstanceOf(UserNotFoundException);
       }
     });
   });

   describe('changeUserStatus', () => {
    it('should change the user status', async () => {
    userdataRepository.findOne = mockUserdataRepository.findOne( false,true);
    userdataRepository.save = mockUserdataRepository.save();
    await service.changeUserStatus(1,UserdataStatus.BLOCKED);
    expect(userdataRepository.findOne).toHaveBeenCalled();
    expect(userdataRepository.save).toHaveBeenCalled();
  });
  it('should not change the user status', async () => {
    userdataRepository.findOne = mockUserdataRepository.findOne(false, false);
    userdataRepository.save = mockUserdataRepository.save();
    try {
      await service.changeUserStatus(2,UserdataStatus.BLOCKED);
    } catch (e) {
      expect(userdataRepository.findOne).toHaveBeenCalled( );
      expect(userdataRepository.save).not.toHaveBeenCalled();
      expect(e).toBeInstanceOf(UserNotFoundException);
    }
  });
});

});
