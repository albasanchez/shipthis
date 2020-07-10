import { Repository, EntityRepository } from 'typeorm';
import { OrderPriceHist } from '../entities/order-price-hist.entity';
import { UpdateOrderTypeHistDto } from '../dto/update-order-type-hist.dto';
import { OrderType } from '../entities/order-type.entity';

@EntityRepository(OrderPriceHist)
export class OrderPriceHistRepository extends Repository<OrderPriceHist> {
  async updateHistory(
    newRegister: UpdateOrderTypeHistDto,
    orderType: OrderType,
  ): Promise<any> {
    const oldRegister: OrderPriceHist = await this.findOne({
      where: { ending_date: null, order_type: orderType },
    });
    oldRegister.ending_date = new Date();

    this.update(oldRegister.order_price_hist_id, oldRegister);

    const newPriceRegister = {
      starting_date: new Date(),
      ending_date: null,
      time_tax: newRegister.time_tax,
      holidays_tax: newRegister.holidays_tax,
      specific_destination_tax: newRegister.specific_destination_tax,
      order_type: orderType,
    };

    return this.save(newPriceRegister);
  }

  async fetchOrderPriceHist(id: number): Promise<OrderPriceHist> {
    return this.findOne({
      where: {
        order_price_hist_id: id,
        ending_date: null,
      },
    });
  }
}
