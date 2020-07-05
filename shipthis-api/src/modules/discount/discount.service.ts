import { DiscPer } from './entities/disc-per.entity';
import { UserDataRepository } from './../userdata/repositories/userdata.repository';
import { AppLoggerService } from 'src/log/applogger.service';
import { DiscPerRepository } from './repositories/disc-per.repository';
import { Userdata } from './../userdata/entities/userdata.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountRepository } from './repositories/discount.repository';
import { Discount } from './entities/discount.entity';
import { UserNotFoundException } from 'src/common/exceptions';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscPerRepository)
    private readonly _discPerRepo: DiscPerRepository,
    @InjectRepository(DiscountRepository)
    private readonly _discountRepo: DiscountRepository,
    @InjectRepository(UserDataRepository)
    private readonly _userRepo: UserDataRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async assignWelcomeDiscount(user: Userdata) {
    this._appLogger.log('Assigning Welcome Discount to new user');
    const welcomeDiscount = await this._discountRepo.fetchWelcomeDicount();
    await this._discPerRepo.assignDiscount(user, welcomeDiscount);
  }

  async getAvaliableDiscounts(useremail: string): Promise<Discount[]> {
    const user: Userdata = await this.validateUser(useremail);
    const discPers: DiscPer[] = await this._discPerRepo.fetchAssignedDiscoust(
      user.user_id,
    );
    const avaliable_discounts: Discount[] = [];
    discPers.map(disc => {
      if (
        !disc.ordersheet &&
        new Date(disc.expiration_date).getTime() > new Date().getTime()
      ) {
        avaliable_discounts.push(disc.discount);
      }
    });
    return avaliable_discounts;
  }

  private async validateUser(useremail: string): Promise<Userdata> {
    const user: Userdata = await this._userRepo.fetchUser(useremail);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
