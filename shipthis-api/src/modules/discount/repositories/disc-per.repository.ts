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

  async validateDiscount(
    discount_id: number,
    user_id: number,
  ): Promise<DiscPer> {
    return this.createQueryBuilder('dp')
      .innerJoinAndSelect(
        'dp.discount',
        'discount',
        `discount.discount_id = ${discount_id}`,
      )
      .leftJoinAndSelect('dp.ordersheet', 'ordersheet')
      .where('dp.user_fk = :fk', { fk: user_id })
      .getOne();
  }

  async fetchAssignedDiscoust(user_id: number): Promise<DiscPer[]> {
    return this.createQueryBuilder('dp')
      .innerJoinAndSelect('dp.discount', 'discount')
      .leftJoinAndSelect('dp.ordersheet', 'ordersheet')
      .where('dp.user_fk = :fk', { fk: user_id })
      .getMany();
  }
}
