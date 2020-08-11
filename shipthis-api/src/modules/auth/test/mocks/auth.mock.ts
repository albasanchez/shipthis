import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { AuthService } from '../../auth.service';
import { EmailService } from '../../../../modules/email/email.service';
import { AuthRepository } from '../../repositories/auth.repository';
import { RolRepository } from '../../../rol/repositories/rol.repository';
import { JwtService } from '@nestjs/jwt';
import { DiscountService } from '../../../../modules/discount/discount.service';
import { Person } from '../../../../modules/userdata/entities/person.entity';
import { UserdataRegistrationType } from '../../../../modules/userdata/constants/user-registration.enum'
import { UserdataStatus } from '../../../../modules/userdata/constants/user-status.enum'
import { Rol } from '../../../../modules/rol/entities/rol.entity';
import { Ordersheet } from '../../../../modules/ordersheet/entities/ordersheet.entity';
import { Receiver } from '../../../../modules/userdata/entities/receiver.entity';
import { Discount } from '../../../../modules/discount/entities/discount.entity';
import { RolName } from '../../../../modules/rol/constants/rol-name.enum';

export const authMockModuleMetadata: ModuleMetadata = {
    providers: [AuthService, AuthRepository, RolRepository,
        {
            provide: EmailService,
            useFactory() {
                return {
                    sendRecoveryEmail: jest.fn(),
                    sendWelcomeEmail: jest.fn()
                };
            },
        },
        {
            provide: DiscountService,
            useFactory() {
                return {
                    assignWelcomeDiscount: jest.fn(),
                };
            },
        },
        {
            provide: JwtService,
            useFactory() {
                return {
                    sign: jest.fn(),
                };
            },
        }
    ],
    imports: [AppLoggerModule],
};
const person = new Person();
const rol = new Rol();
export class AuthMock {
    save() {
        return jest.fn().mockReturnValue({
            user_id: 1,
            person: person,
            email: 'email@email.com',
            password: '12345678',
            registration_date: '2020-08-01',
            registration_type: UserdataRegistrationType.GOOGLE,
            status: UserdataStatus.ACTIVE,
            rol: { name: RolName.CLIENT },
            ordersheets: [new Ordersheet, new Ordersheet],
            receivers: [new Receiver, new Receiver],
            discounts: [new Discount, new Discount],
        });
    }
    find() {
        return jest.fn();
    }
    findOne(type: String, way?: String) {
        if (type === 'google') {
            if (way === 'login') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'email@email.com',
                    password: '12345678',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.GOOGLE,
                    status: UserdataStatus.ACTIVE,
                    rol: rol,
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            } else if (way === 'signUp') {
                return jest.fn().mockResolvedValue(undefined);
            } else if (way === 'notActive') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'email@email.com',
                    password: '12345678',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.GOOGLE,
                    status: UserdataStatus.BLOCKED,
                    rol: rol,
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            }

        }
        else if (type === 'facebook') {
            if (way === 'login') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'email@email.com',
                    password: '12345678',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.FACEBOOK,
                    status: UserdataStatus.ACTIVE,
                    rol: rol,
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            } else if (way === 'signUp') {
                return jest.fn().mockResolvedValue(undefined);
            } else if (way === 'notActive') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'email@email.com',
                    password: '12345678',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.FACEBOOK,
                    status: UserdataStatus.BLOCKED,
                    rol: rol,
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            }
        }
        else if (type === 'regular') {
            if (way === 'clientLogin') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'loginEmail@email.com',
                    password: 'contrasenahasheada',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.REGULAR,
                    status: UserdataStatus.ACTIVE,
                    rol: { name: 'CLIENT' },
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            } else if (way === 'adminLogin') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'loginEmail@email.com',
                    password: 'contrasenahasheada',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.REGULAR,
                    status: UserdataStatus.ACTIVE,
                    rol: { name: 'ADMIN' },
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            } else if (way === 'signUp') {
                return jest.fn().mockResolvedValue(undefined);
            } else if (way === 'notActive') {
                return jest.fn().mockResolvedValue({
                    user_id: 1,
                    person: person,
                    email: 'email@email.com',
                    password: '12345678',
                    registration_date: '2020-08-01',
                    registration_type: UserdataRegistrationType.REGULAR,
                    status: UserdataStatus.BLOCKED,
                    rol: rol,
                    ordersheets: [new Ordersheet, new Ordersheet],
                    receivers: [new Receiver, new Receiver],
                    discounts: [new Discount, new Discount],
                });
            }
        } else if (type === 'recover') {
            return jest.fn().mockResolvedValue({
                user_id: 1,
                person: { document: '12345678' },
                email: 'email@email.com',
                password: '12345678',
                registration_date: '2020-08-01',
                registration_type: UserdataRegistrationType.REGULAR,
                status: UserdataStatus.DELETED,
                rol: rol,
                ordersheets: [new Ordersheet, new Ordersheet],
                receivers: [new Receiver, new Receiver],
                discounts: [new Discount, new Discount],
            });
        }
    }
    jwtSign() {
        return jest.fn().mockResolvedValue({
            payload: 'token'
        });
    }
}

export const getRepo: any = {
    getConnection: jest.fn().mockReturnThis(),
    getRepository:
        jest.fn().mockResolvedValue({
            RolRepository
        })
}

export const createQueryBuilder: any = {
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
};
