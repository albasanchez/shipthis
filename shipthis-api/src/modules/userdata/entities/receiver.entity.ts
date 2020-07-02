import { Ordersheet } from './../../ordersheet/entities/ordersheet.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { Userdata } from './userdata.entity';

@Entity('receiver')
@Check(`rec_status IN ('ACTIVE','DELETED')`)
export class Receiver extends BaseEntity {
  @PrimaryGeneratedColumn()
  receiver_id: number;

  @Column({ name: 'rec_name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'rec_last_name', type: 'varchar', nullable: false })
  last_name: string;

  @Column({ name: 'rec_phone_number', type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ name: 'rec_email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'rec_status', type: 'varchar', nullable: false })
  status: string;

  @ManyToOne(
    type => Userdata,
    userdata => userdata.receivers,
    { nullable: false, eager: true },
  )
  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_id' })
  user: Userdata;

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.receiver,
  )
  ordersheets: Ordersheet[];
}
