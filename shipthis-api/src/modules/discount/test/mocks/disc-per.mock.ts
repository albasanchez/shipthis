import { ModuleMetadata } from '@nestjs/common';
import { DiscPerRepository } from '../../repositories/disc-per.repository';
import { EmailService } from '../../../../modules/email/email.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { DiscountService } from '../../discount.service';
import { DiscountRepository } from '../../repositories/discount.repository';
import { ConfigService } from '../../../../config/config.service';

export const discPerMockModuleMetadata: ModuleMetadata = {
  providers: [
    DiscPerRepository,
  ],
  imports: [AppLoggerModule],
};

export class DiscPerMock {
  findOne(successful: string) {
    if (successful == 'Active') {
      return jest.fn().mockResolvedValue(1);
    } else if (successful == 'Deleted') {
      return jest.fn().mockResolvedValue(2);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
  save() {
    return jest.fn();
  }
  find() {
    return jest.fn().mockResolvedValue(1);
  }
  update() {
    return jest.fn();
  }
}

  export const fetchAssignedDiscoustCreateQueryBuilder: any = {
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue([
    {
      disc_per_id: 1,
      expiration_date: '10/10/2020',
      discount: {
        discount_id: 1,
        name: 'WELCOME',
        percentage: 10,
        status: 'ACTIVE'
        },
      user: { 
        user_id: 1,  
        email: 'luisa@gmail.com', 
        status: 'ACTIVE',
        password: 'test',
        registration_date: new Date(),
        registration_type: 'REGULAR',
        },
      ordersheet: null },
      {
        disc_per_id: 2,
        expiration_date: '01/01/2020',
        discount: {
          discount_id: 1,
          name: 'SUMMER',
          percentage: 20,
          status: 'ACTIVE'
          },
        user: { 
          user_id: 1,  
          email: 'luisa@gmail.com', 
          status: 'ACTIVE',
          password: 'test',
          registration_date: new Date(),
          registration_type: 'REGULAR',
          },
        ordersheet: null }
  ]),  
};

  export const validateDiscountCreateQueryBuilder: any = {
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue([
      {}
    ]),
  };

  export const assignDiscountsCreateQueryBuilder: any = {
    insert: jest.fn().mockReturnThis(),
    into: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnValue([
      {}
    ]),
  };