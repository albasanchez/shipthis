import {
  BaseEntity,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderType } from '../order-type/order-type.entity';
import { Ordersheet } from '../ordersheet/ordersheet.entity';

@Entity('order_price_hist')
export class OrderPriceHist extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_price_hist_id: number;

  @ManyToOne(
    type => OrderType,
    order_type => order_type.prices,
    {
      nullable: false,
      primary: false,
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'order_type_fk', referencedColumnName: 'order_type_id' })
  order_type: OrderType;

  @Column({ type: 'date', nullable: false, name: 'starting_date' })
  starting_date: Date;

  @Column({ type: 'date', nullable: true, name: 'ending_date' })
  ending_date: Date;

  @Column({ type: 'numeric', nullable: false, name: 'time_tax' })
  time_tax: number;

  @Column({ type: 'numeric', nullable: false, name: 'hollydays_tax' })
  hollydays_tax: number;

  @Column({ type: 'numeric', nullable: false, name: 'specific_destinatio_tax' })
  specific_destinatio_tax: number;

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.order_price_hist,
  )
  ordersheets: Ordersheet[];
}
