import { DiscPer } from './entities/disc-per.entity';
import { UserDataRepository } from './../userdata/repositories/userdata.repository';
import { AppLoggerService } from 'src/log/applogger.service';
import { DiscPerRepository } from './repositories/disc-per.repository';
import { Userdata } from './../userdata/entities/userdata.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountRepository } from './repositories/discount.repository';
import { Discount } from './entities/discount.entity';
import {
  UserNotFoundException,
  DiscountNotRegisteredException,
  DiscountDeletedException,
} from 'src/common/exceptions';
import { DiscountInfoDto } from './dto/discount-info.dto';
import { DiscountBasicInfoDto } from './dto/discount-basic-info.dto';
import { MapperDiscount } from './../../mapper/mapper-discount';
import { AssignDiscountDto } from './dto/assign-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { EmailService } from '../email/email.service';
import { DiscountStatus } from './../discount/constants/discount-status.enum';
import { AssignDiscountsDto } from './dto/assign-discounts.dto';
import { Option } from './../discount/constants/option.enum';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscPerRepository)
    private readonly _discPerRepo: DiscPerRepository,
    @InjectRepository(DiscountRepository)
    private readonly _discountRepo: DiscountRepository,
    @InjectRepository(UserDataRepository)
    private readonly _userRepo: UserDataRepository,
    private readonly _emailService: EmailService,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async assignWelcomeDiscount(user: Userdata): Promise<Discount> {
    this._appLogger.log('Assigning Welcome Discount to new user');
    const welcomeDiscount = await this._discountRepo.fetchWelcomeDicount();
    await this._discPerRepo.assignDiscount(user, welcomeDiscount);
    return welcomeDiscount;
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

  private async validateUserById(id: number): Promise<Userdata> {
    const user: Userdata = await this._userRepo.getUser(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  private async validateDiscount(id: number): Promise<Discount> {
    const discount: Discount = await this._discountRepo.findDiscountById(id);
    if (!discount) throw new DiscountNotRegisteredException();
    if (discount.status === DiscountStatus.DELETED)
      throw new DiscountDeletedException();
    return discount;
  }

  async getDiscountsInfo(): Promise<DiscountBasicInfoDto[]> {
    this._appLogger.log('Handling New Request: Consulting Discounts Service');

    const discounts: Discount[] = await this._discountRepo.getActiveDiscounts();

    const discountsInfo: DiscountBasicInfoDto[] = [];

    discounts.forEach(discount => {
      discountsInfo.push(MapperDiscount.discountToDiscountBasicInfo(discount));
    });

    this._appLogger.log(
      'Handling New Request: Discounts Consulted Successfully',
    );

    return discountsInfo;
  }

  async getDiscounts(): Promise<DiscountInfoDto[]> {
    this._appLogger.log('Handling New Request: Consulting Discounts Service');

    const discounts: Discount[] = await this._discountRepo.getDiscounts();

    const discountsInfo: DiscountInfoDto[] = [];

    discounts.forEach(discount => {
      discountsInfo.push(MapperDiscount.discountToDiscountInfo(discount));
    });

    this._appLogger.log(
      'Handling New Request: Discounts Consulted Successfully',
    );

    return discountsInfo;
  }

  async assignDiscount(data: AssignDiscountDto) {
    this._appLogger.log('Handling New Request: Assigning Discount to user');

    const discount = await this.validateDiscount(data.discount_id);

    const user = await this.validateUserById(data.user_id);

    await this._discPerRepo.assignDiscount(user, discount);

    await this._emailService.sendDiscountEmail(
      discount.name,
      discount.percentage,
      user.person.first_name,
      user.person.last_name,
      user.email,
    );

    this._appLogger.log('Discount assigned successfully');
  }

  async updateDiscount(
    id: number,
    newDiscount: UpdateDiscountDto,
  ): Promise<any> {
    this._appLogger.log('Handling New Request: Update Discount Service');

    await this.validateDiscount(id);

    const response = this._discountRepo.updateDiscount(id, newDiscount);

    this._appLogger.log('Discount has been updated sucessfully');

    return response;
  }

  async deleteDiscount(id: number): Promise<any> {
    this._appLogger.log('Handling New Request: Delete Discount Service');

    await this.validateDiscount(id);

    const response = this._discountRepo.deleteDiscount(id);

    this._appLogger.log('Discount has been deleted sucessfully');

    return response;
  }

  async createDiscount(newDiscount: UpdateDiscountDto): Promise<Discount> {
    this._appLogger.log('Handling New Request: Creating Discount');

    const discount: Discount = await this._discountRepo.createDiscount(
      newDiscount,
    );

    this._appLogger.log('Discount have been created successfully');

    return discount;
  }

  async assignDiscounts(optionInfo: AssignDiscountsDto) {
    this._appLogger.log('Handling New Request: Assigning Discounts');

    const discount = await this.validateDiscount(optionInfo.discount_id);

    var users: Userdata[] = [];
    var users_info: any[] = [];

    switch (optionInfo.option) {
      case Option.MORE_ACTIVE_USERS: {
        users_info = await this._userRepo.getUsersWithMoreOrders();
        break;
      }
      case Option.LESS_ACTIVE_USERS: {
        users_info = await this._userRepo.getUsersWithLessOrders();
        break;
      }
      case Option.ALL_USERS: {
        users = await this._userRepo.getAllUsers();
        break;
      }
      case Option.NEW_USERS: {
        users_info = await this._userRepo.getLatestUsers();
        break;
      }
      default:
        break;
    }

    if (!(users_info.length == 0)) {
      const users_id: number[] = [];

      users_info.forEach(user => {
        users_id.push(user.user_id);
      });
      users = await this._userRepo.getUsers(users_id);
    }

    await this._discPerRepo.assignDiscounts(users, discount);

    await this.sendEmails(users, discount);

    this._appLogger.log('Discounts assigned successfully');

    return { response: 'Discounts assigned successfully' };
  }

  private async sendEmails(users: Userdata[], discount: Discount) {
    for (const user of users) {
      await this._emailService.sendDiscountEmail(
        discount.name,
        discount.percentage,
        user.person.first_name,
        user.person.last_name,
        user.email,
      );
    }
  }
}
