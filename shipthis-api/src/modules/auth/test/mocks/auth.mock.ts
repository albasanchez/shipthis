import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { AuthService } from '../../auth.service';
import { EmailService } from '../../../../modules/email/email.service';
import { AuthRepository } from '../../repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { DiscountService } from '../../../../modules/discount/discount.service';
import { Person } from '../../../../modules/userdata/entities/person.entity';
import { UserdataRegistrationType } from '../../../../modules/userdata/constants/user-registration.enum'
import { UserdataStatus } from '../../../../modules/userdata/constants/user-status.enum'
import { Rol } from '../../../../modules/rol/entities/rol.entity';
import { Ordersheet } from '../../../../modules/ordersheet/entities/ordersheet.entity';
import { Receiver } from '../../../../modules/userdata/entities/receiver.entity';
import { Discount } from '../../../../modules/discount/entities/discount.entity';

export const authMockModuleMetadata: ModuleMetadata = {
    providers: [AuthService, AuthRepository,
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
        return jest.fn();
    }
    find() {
        return jest.fn();
    }
    findOne() {
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
    }
}
