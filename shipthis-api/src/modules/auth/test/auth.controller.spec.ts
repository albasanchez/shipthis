import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('Auth Controller', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useFactory() {
                        return {
                            googleLogin: jest.fn(),
                            facebookLogin: jest.fn(),
                            clientSignup: jest.fn(),
                            adminSignup: jest.fn(),
                            clientLogin: jest.fn(),
                            adminLogin: jest.fn(),
                            recoverUser: jest.fn(),
                            attendRecoveryRequest: jest.fn(),
                        };
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    describe('googleLogin', () => {
        it('should return promise', () => {
            const user = {
                useremail: 'email@email.com',
                first_name: 'Petronilo',
                last_name: 'Sanchez',
                def_language: 'en',
                picture_url: 'https://pic',
            };
            controller.googleLogin(user);
            expect(service.googleLogin).toHaveBeenCalled();
        });
    });
    describe('facebookLogin', () => {
        it('should return promise', () => {
            const user = {
                useremail: 'email@email.com',
                first_name: 'Petronilo',
                last_name: 'Sanchez',
                def_language: 'en',
                picture_url: 'https://pic',
            };
            controller.facebookLogin(user);
            expect(service.facebookLogin).toHaveBeenCalled();
        });
    });
    describe('facebookLogin', () => {
        it('should return promise', () => {
            const user = {
                useremail: 'email@email.com',
                first_name: 'Petronilo',
                last_name: 'Sanchez',
                def_language: 'en',
                picture_url: 'https://pic',
            };
            controller.facebookLogin(user);
            expect(service.facebookLogin).toHaveBeenCalled();
        });
    });
    describe('clientRegistration', () => {
        it('should return promise', () => {
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
            controller.clientRegidstration(user);
            expect(service.clientSignup).toHaveBeenCalledWith(user);
        });
    });
    describe('adminRegidstration', () => {
        it('should return promise', () => {
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
            controller.adminRegidstration(user);
            expect(service.adminSignup).toHaveBeenCalledWith(user);
        });
    });
    describe('clientLogin', () => {
        it('should return promise', () => {
            const user = {
                username: 'Prueba561651',
                useremail: 'email@email.com',
                password: '12345678',
            };
            controller.clientLogin(user);
            expect(service.clientLogin).toHaveBeenCalledWith(user);
        });
    });
    describe('adminLogin', () => {
        it('should return promise', () => {
            const user = {
                username: 'Prueba561651',
                useremail: 'email@email.com',
                password: '12345678',
            };
            controller.adminLogin(user);
            expect(service.adminLogin).toHaveBeenCalledWith(user);
        });
    });
    describe('recoverUserRequest', () => {
        it('should return promise', () => {
            const user = {
                useremail: 'email@email.com',
                document: '12345678',
            };
            controller.recoverUserRequest(user);
            expect(service.attendRecoveryRequest).toHaveBeenCalledWith(user);
        });
    });
    describe('recoverUserChange', () => {
        it('should return promise', () => {
            const user = {
                useremail: 'email@email.com',
                password: '12345678',
            };
            controller.recoverUserChange(user);
            expect(service.recoverUser).toHaveBeenCalledWith(user);
        });
    });
});
