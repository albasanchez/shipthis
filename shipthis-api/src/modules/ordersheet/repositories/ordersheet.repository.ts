import { Userdata } from './../../userdata/entities/userdata.entity';
import { Repository, EntityRepository, Not } from 'typeorm';
import { Ordersheet } from '../entities/ordersheet.entity';
import { OrdersheetStatus } from '../constants/ordersheet-status.enum';

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

  async searchNotDeliveredOrders(): Promise<Ordersheet[]> {
    return await this.find({
      where: { status: Not(OrdersheetStatus.DELIVERED) },
    });
  }

  async updateOrdersheetStatus(
    order_id: number,
    newStatus: string,
    date: Date,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({ status: newStatus, delivery_date: date })
      .where({ ordersheet_id: order_id })
      .execute();
  }

  async getUserHistory(user: Userdata): Promise<Ordersheet[]> {
    return this.find({ where: { user: user } });
  }
}
