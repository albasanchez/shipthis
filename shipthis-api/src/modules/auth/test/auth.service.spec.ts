import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import {
  AuthMock,
  authMockModuleMetadata,
  createQueryBuilder,
} from './mocks/auth.mock';
import { RoleMock } from './mocks/role.mock';
import { DiscountMock } from './mocks/discount.mock';
import { DiscountService } from '../../discount/discount.service';
import { JwtService } from '@nestjs/jwt';
import { Rol } from './../../rol/entities/rol.entity';
import { UserNotActiveException } from '../../../common/exceptions/user-not-active.exception';

// import { mocked } from 'ts-jest/utils';
const typeorm = require('typeorm');
const bcryptjs = require('bcryptjs');
import { mocked } from 'ts-jest/utils';
import { getConnection, Connection } from 'typeorm';

import { RolRepository } from '../../../modules/rol/repositories/rol.repository';
import { RolName } from '../../../modules/rol/constants/rol-name.enum';
import {
  UserAlreadyRegisteredException,
  BlockedUserException,
  UserNotFoundException,
  UserFederatedException,
  WrongCredentialsException,
  WrongRoleTypeAccessException,
  WrongRecoveryCredentialsException,
} from '../../../common/exceptions';

describe('AuthService', () => {
  let authService: AuthService;
  let discService: DiscountService;
  let jwtService: JwtService;
  let authRepository: AuthRepository;
  let roleRepository: RolRepository;
  const mockAuthRepository: AuthMock = new AuthMock();
  const mockRolRepository: RoleMock = new RoleMock();
  const mockDiscountRepository: DiscountMock = new DiscountMock();
  // const getConn: Connection = getConnection()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      authMockModuleMetadata,
    ).compile();

    authService = module.get<AuthService>(AuthService);
    discService = module.get<DiscountService>(DiscountService);
    jwtService = module.get<JwtService>(JwtService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    roleRepository = module.get<RolRepository>(RolRepository);
  });

  describe('googleLogin', () => {
    it('should login with google', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      authRepository.findOne = mockAuthRepository.findOne('google', 'login');
      const response = await authService.googleLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should signup with google', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      roleRepository.findOne = mockRolRepository.findOne(RolName.CLIENT);
      jest.spyOn(typeorm, 'getConnection').mockImplementation(
        () =>
          ({
            isConnected: true,
            getRepository: function () {
              return roleRepository;
            },
          } as any),
      );
      authRepository.save = mockAuthRepository.save();
      authRepository.find = jest.fn().mockResolvedValue([
        {
          user_id: 1,
          email: 'email@email.com',
          status: 'ACTIVE',
          rol: { name: RolName.CLIENT },
        },
      ]);
      authRepository.findOne = mockAuthRepository.findOne('google', 'signUp');
      discService.assignWelcomeDiscount = mockDiscountRepository.assignWelcomeDiscount();
      const response = await authService.googleLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should not signup or login with google', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'google',
          'notActive',
        );
        await authService.googleLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotActiveException);
      }
    });
  });

  describe('facebookLogin', () => {
    it('should login with facebook', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      authRepository.findOne = mockAuthRepository.findOne('facebook', 'login');
      const response = await authService.facebookLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should signup with facebook', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      roleRepository.findOne = mockRolRepository.findOne(RolName.CLIENT);
      jest.spyOn(typeorm, 'getConnection').mockImplementation(
        () =>
          ({
            isConnected: true,
            getRepository: function () {
              return roleRepository;
            },
          } as any),
      );
      authRepository.save = mockAuthRepository.save();
      authRepository.find = jest.fn().mockResolvedValue([
        {
          user_id: 1,
          email: 'email@email.com',
          status: 'ACTIVE',
          rol: { name: RolName.CLIENT },
        },
      ]);
      authRepository.findOne = mockAuthRepository.findOne('google', 'signUp');
      discService.assignWelcomeDiscount = mockDiscountRepository.assignWelcomeDiscount();
      const response = await authService.facebookLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should not signup or login with facebook', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'facebook',
          'notActive',
        );
        await authService.facebookLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotActiveException);
      }
    });
  });

  describe('regularSignup', () => {
    it('should signup being a client', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      authRepository.findOne = mockAuthRepository.findOne('regular', 'signUp');
      jest.spyOn(bcryptjs, 'genSalt').mockImplementation(() => 'pS039wd1lxXq');
      jest
        .spyOn(bcryptjs, 'hash')
        .mockImplementation(() => 'contrasenahasheada');
      roleRepository.findOne = mockRolRepository.findOne(RolName.CLIENT);
      jest.spyOn(typeorm, 'getConnection').mockImplementation(
        () =>
          ({
            isConnected: true,
            getRepository: function () {
              return roleRepository;
            },
          } as any),
      );
      authRepository.save = mockAuthRepository.save();
      authRepository.find = jest.fn().mockResolvedValue([
        {
          user_id: 1,
          email: 'email@email.com',
          status: 'ACTIVE',
          rol: { name: RolName.CLIENT },
        },
      ]);
      authRepository.findOne = mockAuthRepository.findOne('regular', 'signUp');
      discService.assignWelcomeDiscount = mockDiscountRepository.assignWelcomeDiscount();
      const response = await authService.clientSignup(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should signup being an admin', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      authRepository.findOne = mockAuthRepository.findOne('regular', 'signUp');
      jest.spyOn(bcryptjs, 'genSalt').mockImplementation(() => 'pS039wd1lxXq');
      jest
        .spyOn(bcryptjs, 'hash')
        .mockImplementation(() => 'contrasenahasheada');
      roleRepository.findOne = mockRolRepository.findOne(RolName.ADMIN);
      jest.spyOn(typeorm, 'getConnection').mockImplementation(
        () =>
          ({
            isConnected: true,
            getRepository: function () {
              return roleRepository;
            },
          } as any),
      );
      authRepository.save = mockAuthRepository.save();
      authRepository.find = jest.fn().mockResolvedValue([
        {
          user_id: 1,
          email: 'email@email.com',
          status: 'ACTIVE',
          rol: { name: RolName.CLIENT },
        },
      ]);
      authRepository.findOne = mockAuthRepository.findOne('regular', 'signUp');
      discService.assignWelcomeDiscount = mockDiscountRepository.assignWelcomeDiscount();
      const response = await authService.adminSignup(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should not signup', async () => {
      const user = {
        useremail: 'email@email.com',
        password: '12345678',
        document: '123456789',
        first_name: 'Petronilo',
        middle_name: 'Petronilito',
        last_name: 'Sanchez',
        second_last_name: 'Perez',
        gender: 'O',
        phone_number: '7554234578',
        date_of_birth: '02/05/1990',
        def_language: 'en',
        picture_url: 'https://pic',
        receive_notifications: true,
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'regular',
          'signUpFailed',
        );
        await authService.clientSignup(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserAlreadyRegisteredException);
      }
    });
  });
  describe('regularLogin', () => {
    it('should login being a client', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);
      authRepository.findOne = mockAuthRepository.findOne(
        'regular',
        'clientLogin',
      );
      const response = await authService.clientLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should login being an admin', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);
      authRepository.findOne = mockAuthRepository.findOne(
        'regular',
        'adminLogin',
      );
      const response = await authService.adminLogin(user);
      expect(response).toStrictEqual({
        newUser: expect.any(Boolean),
        token: undefined,
        userdata: expect.anything(),
      });
    });
    it('should not login because user passwords dont match', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      try {
        jest.spyOn(bcryptjs, 'compare').mockImplementation(() => false);
        authRepository.findOne = mockAuthRepository.findOne(
          'regular',
          'clientLogin',
        );
        await authService.clientLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(WrongCredentialsException);
      }
    });
    it('should not login because user is not registered', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedNotRegistered',
        );
        await authService.clientLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
    it('should not login because user is not active', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      try {
        jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);
        authRepository.findOne = mockAuthRepository.findOne(
          'regular',
          'notActive',
        );
        await authService.clientLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotActiveException);
      }
    });
    it('should not login because user role dont match', async () => {
      const user = {
        username: 'Pruebito',
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      try {
        jest.spyOn(bcryptjs, 'compare').mockImplementation(() => true);
        authRepository.findOne = mockAuthRepository.findOne(
          'regular',
          'loginFailedRoleDontMatch',
        );
        await authService.clientLogin(user);
      } catch (e) {
        expect(e).toBeInstanceOf(WrongRoleTypeAccessException);
      }
    });
  });
  describe('recover', () => {
    it('should recover user', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      authRepository.findOne = mockAuthRepository.findOne('recover');
      jest.spyOn(bcryptjs, 'genSalt').mockImplementation(() => 'pS039wd1lxXq');
      jest
        .spyOn(bcryptjs, 'hash')
        .mockImplementation(() => 'contrasenahasheada');
      jest
        .spyOn(authRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      const response = await authService.recoverUser(user);
      expect(response).toStrictEqual({
        response: 'New password set on user successfully',
      });
    });
    it('should not recover user because is not registered', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        password: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedNotRegistered',
        );
        await authService.recoverUser(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
    it('should attend recovery request', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        document: '12345678',
      };
      authRepository.findOne = mockAuthRepository.findOne('recover');
      jwtService.sign = mockAuthRepository.jwtSign();
      const response = await authService.attendRecoveryRequest(user);
      expect(response).toStrictEqual({
        response: 'Recovery email sent successfully',
      });
    });
    it('should not attend recovery request because user is blocked', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        document: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedBlocked',
        );
        await authService.attendRecoveryRequest(user);
      } catch (e) {
        expect(e).toBeInstanceOf(BlockedUserException);
      }
    });
    it('should not attend recovery request because user is not registered', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        document: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedNotRegistered',
        );
        await authService.attendRecoveryRequest(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotFoundException);
      }
    });
    it('should not attend recovery request because user did federated sign up', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        document: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedFederated',
        );
        await authService.attendRecoveryRequest(user);
      } catch (e) {
        expect(e).toBeInstanceOf(UserFederatedException);
      }
    });
    it('should not attend recovery request because user documents dont match', async () => {
      const user = {
        useremail: 'loginEmail@email.com',
        document: '12345678',
      };
      try {
        authRepository.findOne = mockAuthRepository.findOne(
          'recoverFailedDocumentsDontMatch',
        );
        await authService.attendRecoveryRequest(user);
      } catch (e) {
        expect(e).toBeInstanceOf(WrongRecoveryCredentialsException);
      }
    });
  });
});
