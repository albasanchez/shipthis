import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { DiscPer } from './disc-per.entity';

@Entity('discount')
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  discount_id: number;

  @Column({ name: 'dis_name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'dis_percentage', type: 'numeric', nullable: false })
  percentage: number;

  @OneToMany(
    type => DiscPer,
    disc_per => disc_per.discount,
  )
  disc_pers: DiscPer[];
}
