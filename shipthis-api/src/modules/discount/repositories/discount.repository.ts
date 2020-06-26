import { Repository, EntityRepository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
  async fetchWelcomeDicount(): Promise<Discount> {
    return this.findOne({ where: { name: 'WELCOME' } });
  }
}
