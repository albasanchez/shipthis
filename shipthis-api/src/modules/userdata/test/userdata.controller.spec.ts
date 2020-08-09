import { Test, TestingModule } from '@nestjs/testing';
import { UserdataController } from '../userdata.controller';
import { UserdataService } from '../userdata.service';
import { LanguageType } from '../constants/language.enum';
import { UserdataStatus } from '../constants/user-status.enum';

describe('Userdata Controller', () => {
  let controller: UserdataController;
  let service: UserdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdataController],
      providers: [
        {
          provide: UserdataService,
          useFactory() {
            return {
              getReceivers: jest.fn(),
              createReceiver: jest.fn(),
              updateReceiver: jest.fn(),
              deleteReceiver: jest.fn(),
              getAllUsersInfo: jest.fn(),
              deleteUser: jest.fn(),
              modifyPassword: jest.fn(),
              modifyUserdata: jest.fn(),
              changeUserStatus: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<UserdataController>(UserdataController);
    service = module.get<UserdataService>(UserdataService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getReceivers', () => {
    it('should return saved response', () => {
      const userID: number = 1;
      controller.getReceivers(userID);
      expect(service.getReceivers).toHaveBeenCalledWith(userID);
    });
  });

  describe('createReceiver', () => {
    it('should return saved response', () => {
      const receiver = { name: 'Ana', last_name: 'Lopez', phone_number:'+1 (654) 562 5698', 
      email: 'analopez1998@gmail.com', user_fk: 1 };
      controller.createReceiver(receiver);
      expect(service.createReceiver).toHaveBeenCalledWith(receiver);
    });
  });

  describe('updateReceiver', () => {
    it('should return saved response', () => {
      const receiverID: number = 1;
      const receiver = { name: 'Ana', last_name: 'Contreras', phone_number:'+1 (654) 562 5698', 
      email: 'analopez1998@gmail.com' };
      controller.updateReceiver(receiverID, receiver);
      expect(service.updateReceiver).toHaveBeenCalledWith(receiverID, receiver);
    });
  });

  describe('deleteReceiver', () => {
    it('should return saved response', () => {
      const receiverID: number = 1;
      controller.deleteReceiver(receiverID);
      expect(service.deleteReceiver).toHaveBeenCalledWith(receiverID);
    });
  });

  describe('getAllUsersInfo', () => {
    it('should return saved response', () => {
      controller.getAllUsersInfo();
      expect(service.getAllUsersInfo).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should return saved response', () => {
      const userID: number = 1;
      controller.deleteUser(userID);
      expect(service.deleteUser).toHaveBeenCalledWith(userID);
    });
  });

  describe('modifyPassword', () => {
    it('should return saved response', () => {
      const info = { user_id: 1, actual_password: 'test', new_password:'test-password' };
      controller.modifyPassword(info);
      expect(service.modifyPassword).toHaveBeenCalledWith(info);
    });
  });

  describe('modifyInfo', () => {
    it('should return saved response', () => {
      const info = { user_id:1, first_name: 'Ana', middle_name: 'Maria', last_name: 'Contreras', second_last_name: 'Lara',
       phone_number:'+1 (654) 562 5698', def_language: LanguageType.ENGLISH, picture_url: null,  receive_notifications: true};
      controller.modifyInfo(info);
      expect(service.modifyUserdata).toHaveBeenCalledWith(info);
    });
  });

  describe('updateStatus', () => {
    it('should return saved response', () => {
      const info = { user_id:1, status: UserdataStatus.DELETED};
      controller.updateStatus(info);
      expect(service.changeUserStatus).toHaveBeenCalledWith(info.user_id, info.status);
    });
  });
});
