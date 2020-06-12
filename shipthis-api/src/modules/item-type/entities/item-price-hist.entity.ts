import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pickup } from './../../commercial-ally/entities/pickup.entity';
import { Ordersheet } from './../../ordersheet/entities/ordersheet.entity';

@Entity('item_price_hist')
export class ItemPriceHist extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_price_hist_id: number;

  @Column({ type: 'date', nullable: false, name: 'starting_date' })
  starting_date: Date;

  @Column({ type: 'date', nullable: true, name: 'ending_date' })
  ending_date: Date;

  @Column({ type: 'numeric', nullable: false, name: 'base_price' })
  base_price: number;

  @Column({ type: 'numeric', nullable: false, name: 'price_km' })
  price_km: number;

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.item_price_hist,
  )
  ordersheets: Ordersheet[];

  @OneToMany(
    type => Pickup,
    pickup => pickup.item_price_hist,
  )
  pickups: Pickup[];
}
