import { Userdata } from './../../userdata/entities/userdata.entity';
import { DiscPer } from './../entities/disc-per.entity';
import { Repository, EntityRepository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@EntityRepository(DiscPer)
export class DiscPerRepository extends Repository<DiscPer> {
  async assignDiscount(user: Userdata, discount: Discount) {
    const discPer: DiscPer = new DiscPer();
    discPer.discount = discount;
    discPer.user = user;

    const date: Date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    discPer.expiration_date = date;

    return this.save(discPer);
  }
}
