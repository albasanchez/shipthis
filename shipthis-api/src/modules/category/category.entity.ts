import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ItemType } from '../item-type/item-type.entity';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    name: 'caegory_name',
  })
  name: string;

  @OneToMany(
    type => ItemType,
    item_type => item_type.category,
  )
  item_types: ItemType[];
}
