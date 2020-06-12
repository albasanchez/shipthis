import { Repository, EntityRepository } from 'typeorm';
import { OrderPriceHist } from '../entities/order-price-hist.entity';

@EntityRepository(OrderPriceHist)
export class OrderPriceHistRepository extends Repository<OrderPriceHist> {}
