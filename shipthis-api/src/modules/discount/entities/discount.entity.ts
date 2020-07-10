import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
} from 'typeorm';
import { DiscPer } from './disc-per.entity';

@Entity('discount')
@Check(`status IN ('ACTIVE','DELETED')`)
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  discount_id: number;

  @Column({ name: 'dis_name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'dis_percentage', type: 'numeric', nullable: false })
  percentage: number;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @OneToMany(
    type => DiscPer,
    disc_per => disc_per.discount,
  )
  disc_pers: DiscPer[];
}
