import { Repository, EntityRepository } from 'typeorm';
import { Ordersheet } from '../entities/ordersheet.entity';

@EntityRepository(Ordersheet)
export class OrdersheetRepository extends Repository<Ordersheet> {
  async getAllOrders(): Promise<Ordersheet[]> {
    return this.find();
  }

  async registerOrder(order: Ordersheet): Promise<Ordersheet> {
    return this.save(order);
  }

  async fetchOrder(track_id: string): Promise<Ordersheet> {
    return this.findOne(track_id);
  }
}
