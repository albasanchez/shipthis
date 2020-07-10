import { OrderTypeStatus } from './../constants/order-type-status.enum';
import {
  BaseEntity,
  Entity,
  Check,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { OrderPriceHist } from './order-price-hist.entity';

@Entity('order_type')
@Check(`order_type_status IN ('ACTIVE','BLOCKED')`)
export class OrderType extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_type_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'order_name' })
  name: string;

  @Column({ type: 'integer', nullable: false, name: 'days_to_deliver' })
  days_to_deliver: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'order_type_status',
    default: OrderTypeStatus.ACTIVE,
  })
  status: string;

  @OneToMany(
    type => OrderPriceHist,
    order_price_hist => order_price_hist.order_type,
  )
  prices: OrderPriceHist[];
}
