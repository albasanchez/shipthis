import { UserDataRepository } from './../userdata/repositories/userdata.repository';
import { AppLoggerModule } from './../../log/applogger.module';
import { DiscPerRepository } from './repositories/disc-per.repository';
import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DiscountRepository } from './repositories/discount.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscountRepository,
      DiscPerRepository,
      UserDataRepository,
    ]),
    AppLoggerModule,
    EmailModule,
  ],
  providers: [DiscountService],
  controllers: [DiscountController],
  exports: [DiscountService],
})
export class DiscountModule {}
