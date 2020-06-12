import { Ordersheet } from './../../ordersheet/entities/ordersheet.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
} from 'typeorm';
import { Discount } from './discount.entity';
import { Userdata } from './../../userdata/entities/userdata.entity';

@Entity('disc_per')
export class DiscPer extends BaseEntity {
  @PrimaryGeneratedColumn()
  disc_per_id: number;

  @ManyToOne(
    type => Discount,
    discount => discount.disc_pers,
    { onDelete: 'CASCADE', nullable: false, eager: true },
  )
  @JoinColumn({ name: 'discount_fk', referencedColumnName: 'discount_id' })
  discount: Discount;

  @ManyToOne(
    type => Userdata,
    user => user.discounts,
    { onDelete: 'CASCADE', nullable: false },
  )
  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_id' })
  user: Userdata;

  @OneToOne(
    type => Ordersheet,
    ordersheet => ordersheet.discount,
  )
  ordersheet: Ordersheet;
}
