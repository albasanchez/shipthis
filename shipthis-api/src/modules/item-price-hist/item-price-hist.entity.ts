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
import { ItemType } from '../item-type/item-type.entity';
import { Item } from '../item/item.entity';

@Entity('item_price_hist')
export class ItemPriceHist extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_price_hist_id: number;

  @ManyToOne(
    type => ItemType,
    item_type => item_type.prices,
    {
      nullable: false,
      primary: false,
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'item_type_fk', referencedColumnName: 'item_type_id' })
  item_type: ItemType;

  @Column({ type: 'date', nullable: false, name: 'starting_date' })
  starting_date: Date;

  @Column({ type: 'date', nullable: true, name: 'ending_date' })
  ending_date: Date;

  @Column({ type: 'numeric', nullable: false, name: 'base_price' })
  base_price: number;

  @Column({ type: 'numeric', nullable: false, name: 'price_km' })
  price_km: number;

  @Column({ type: 'numeric', nullable: false, name: 'ensurance_tax' })
  ensurance_tax: number;

  @Column({ type: 'numeric', nullable: false, name: 'fragily_tax' })
  fragily_tax: number;

  @OneToMany(
    type => Item,
    item => item.item_type_hist,
  )
  items: Item[];
}
