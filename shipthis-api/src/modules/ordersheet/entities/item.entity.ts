import { CharPriceHist } from './../../item-type/entities/char-price-hist.entity';
import { Pickup } from './../../commercial-ally/entities/pickup.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ordersheet } from './ordersheet.entity';

@Entity('item')
export class Item extends BaseEntity {
  //atributes
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ type: 'varchar', nullable: true, name: 'description' })
  description: string;

  @Column({ type: 'numeric', nullable: true, name: 'item_weight' })
  item_weight: number;

  @Column({ type: 'numeric', nullable: true, name: 'item_length' })
  item_length: number;

  @Column({ type: 'numeric', nullable: true, name: 'item_width' })
  item_width: number;

  @Column({ type: 'numeric', nullable: true, name: 'item_height' })
  item_height: number;

  @Column({ type: 'numeric', nullable: true, name: 'item_cost' })
  item_cost: number;

  //Relations
  @ManyToOne(
    type => Ordersheet,
    ordersheet => ordersheet.items,
    {
      nullable: true,
      onDelete: 'CASCADE',
      primary: false,
    },
  )
  @JoinColumn({ name: 'ordersheet_fk', referencedColumnName: 'ordersheet_id' })
  ordersheet: Ordersheet;

  @ManyToOne(
    type => Pickup,
    pickup => pickup.items,
    {
      nullable: true,
      onDelete: 'CASCADE',
      primary: false,
    },
  )
  @JoinColumn({ name: 'pickup_fk', referencedColumnName: 'pickup_id' })
  pickup: Pickup;

  @ManyToMany(
    type => CharPriceHist,
    char_price_hist => char_price_hist.char_items,
    { cascade: true, eager: true },
  )
  @JoinTable({ name: 'char_item' })
  characteristics: CharPriceHist[];
}
