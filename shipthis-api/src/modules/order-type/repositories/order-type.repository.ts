import { OrderTypeStatus } from './../constants/order-type-status.enum';
import { EntityRepository, Repository } from 'typeorm';
import { OrderType } from '../entities/order-type.entity';

@EntityRepository(OrderType)
export class OrderTypeRepository extends Repository<OrderType> {
  async getAllActiveOrdertypes(): Promise<OrderType[]> {
    return this.createQueryBuilder('ot')
      .innerJoinAndSelect('ot.prices', 'prices', 'prices.ending_date is null')
      .where('ot.status = :st', { st: OrderTypeStatus.ACTIVE })
      .getMany();
  }

  async getOrderTypeById(id: number): Promise<OrderType> {
    return this.findOne({ where: { order_type_id: id } });
  }
}
