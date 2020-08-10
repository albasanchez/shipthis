import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import {
    AuthMock,
    authMockModuleMetadata,
} from './mocks/auth.mock';
import { Any } from 'typeorm';

describe('AuthService', () => {
    let service: AuthService;
    let repository: AuthRepository;
    const mockRepository: AuthMock = new AuthMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule(
            authMockModuleMetadata,
        ).compile();

        service = module.get<AuthService>(AuthService);
        repository = module.get<AuthRepository>(AuthRepository);
    });

    describe('googleLogin', () => {
        it('should login or register a user', async () => {
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
            repository.findOne = mockRepository.findOne();
            const response = await service.googleLogin(user);
            // expect(repository.save).toHaveBeenCalled();
            // expect(response).toEqual({ response: 'Comment registered successfully' });
            expect(response).toStrictEqual(
                {
                    newUser: expect.any(Boolean),
                    token: undefined,
                    userdata: expect.anything(),
                }
            );
        });
    });


});
