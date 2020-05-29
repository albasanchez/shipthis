import { EntityRepository, Repository } from 'typeorm';
import { OrderType } from './order-type.entity';

@EntityRepository(OrderType)
export class OrderTypeRepository extends Repository<OrderType> {}
