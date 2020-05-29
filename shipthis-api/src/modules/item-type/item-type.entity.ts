import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { ItemPriceHist } from '../item-price-hist/item-price-hist.entity';

@Entity('item_type')
@Check(`item_type_status IN ('ACTIVE','BLOCKED')`)
export class ItemType extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_type_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'item_name' })
  name: string;

  @Column({ type: 'numeric', nullable: false, name: 'max_weight' })
  max_weight: number;

  @Column({ type: 'numeric', nullable: false, name: 'max_volume' })
  max_volume: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'item_type_status',
  })
  status: string;

  @ManyToOne(
    type => Category,
    category => category.item_types,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'category_fk', referencedColumnName: 'category_id' })
  category: Category;

  @OneToMany(
    type => ItemPriceHist,
    item_price_hist => item_price_hist.item_type,
  )
  prices: ItemPriceHist[];
}
