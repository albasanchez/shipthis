import { Repository, EntityRepository } from 'typeorm';
import { Discount } from '../entities/discount.entity';
import { UpdateDiscountDto } from '../dto/update-discount.dto';
import { DiscountStatus } from './../../discount/constants/discount-status.enum';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
  async fetchWelcomeDicount(): Promise<Discount> {
    return this.findOne({ where: { name: 'WELCOME' } });
  }

  async getActiveDiscounts(): Promise<Discount[]> {
    return this.find({ where: { status: DiscountStatus.ACTIVE } });
  }

  async getDiscounts(): Promise<Discount[]> {
    return this.find();
  }

  async findDiscountById(id: number): Promise<Discount> {
    return this.findOne({ where: { discount_id: id } });
  }

  async createDiscount(newDiscount: UpdateDiscountDto): Promise<any> {
    const discount: Discount = new Discount();

    discount.name = newDiscount.name;
    discount.percentage = newDiscount.percentage;
    discount.status = DiscountStatus.ACTIVE;

    return this.save(discount);
  }

  async updateDiscount(
    id: number,
    newDiscount: UpdateDiscountDto,
  ): Promise<any> {
    this.update(id, newDiscount);

    return { response: 'Discount has been updated sucessfully' };
  }

  async deleteDiscount(id: number): Promise<any> {
    this.update(id, { status: DiscountStatus.DELETED });

    return { response: 'Discount has been deleted sucessfully' };
  }
}
