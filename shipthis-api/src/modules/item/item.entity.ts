import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Ordersheet } from '../ordersheet/ordersheet.entity';
import { ItemPriceHist } from '../item-price-hist/item-price-hist.entity';

@Entity('item')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(
    tyoe => Ordersheet,
    ordersheet => ordersheet.items,
    {
      nullable: false,
      onDelete: 'CASCADE',
      primary: false,
    },
  )
  @JoinColumn({ name: 'ordersheet_fk', referencedColumnName: 'ordersheet_id' })
  ordersheet: Ordersheet;

  @ManyToOne(
    type => ItemPriceHist,
    item_price_hist => item_price_hist.items,
    {
      nullable: false,
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
      primary: false,
    },
  )
  @JoinColumn({
    name: 'item_price_hist_fk',
    referencedColumnName: 'item_price_hist_id',
  })
  item_type_hist: ItemPriceHist;

  @Column({ type: 'numeric', nullable: true, name: 'item_weight' })
  item_weight: number;

  @Column({ type: 'numeric', nullable: true, name: 'item_volumen' })
  item_volumen: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
    name: 'is_insured',
  })
  is_insured: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
    name: 'is_fragile',
  })
  is_fragile: boolean;
}
