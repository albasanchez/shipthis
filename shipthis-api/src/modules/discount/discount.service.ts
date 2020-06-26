import { AppLoggerService } from 'src/log/applogger.service';
import { DiscPerRepository } from './repositories/disc-per.repository';
import { Userdata } from './../userdata/entities/userdata.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountRepository } from './repositories/discount.repository';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscPerRepository)
    private readonly _discPerRepo: DiscPerRepository,
    @InjectRepository(DiscountRepository)
    private readonly _discountRepo: DiscountRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async assignWelcomeDiscount(user: Userdata) {
    this._appLogger.log('Assigning Welcome Discount to new user');
    const welcomeDiscount = await this._discountRepo.fetchWelcomeDicount();
    await this._discPerRepo.assignDiscount(user, welcomeDiscount);
  }
}
