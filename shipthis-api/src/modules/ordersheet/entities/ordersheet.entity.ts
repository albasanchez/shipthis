import {
  BaseEntity,
  Entity,
  Check,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ItemPriceHist } from './../../item-type/entities/item-price-hist.entity';
import { Receiver } from './../../userdata/entities/receiver.entity';
import { Office } from './../../office/entities/office.entity';
import { Userdata } from './../../userdata/entities/userdata.entity';
import { OrderPriceHist } from '../../order-type/entities/order-price-hist.entity';
import { OrdersheetStatus } from './../constants/ordersheet-status.enum';
import { Place } from './place.entity';
import { Item } from './item.entity';
import { Trajectory } from './trajectory.entity';
import { DiscPer } from './../../discount/entities/disc-per.entity';

@Entity('ordersheet')
@Check(`order_status IN ('DELIVERY','TRANSIT','DELIVERED')`)
export class Ordersheet extends BaseEntity {
  //atributes
  @PrimaryGeneratedColumn('uuid')
  ordersheet_id: number;

  @Column({ type: 'date', nullable: false, name: 'creation_date' })
  creation_date: Date;

  @Column({
    type: 'varchar',
    enum: OrdersheetStatus,
    default: OrdersheetStatus.DELIVERY,
    name: 'order_status',
  })
  status: string;

  @Column({ type: 'date', nullable: true, name: 'delivery_date' })
  delivery_date: Date;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
    name: 'ignore_holidays',
  })
  ignore_holidays: boolean;

  @Column({ type: 'numeric', nullable: true, name: 'facturation_amount' })
  facturation_amount: number;

  //relations
  @ManyToOne(
    type => Userdata,
    userdata => userdata.ordersheets,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
      primary: false,
    },
  )
  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_id' })
  user: Userdata;

  @ManyToOne(
    type => Receiver,
    receiver => receiver.ordersheets,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
      primary: false,
    },
  )
  @JoinColumn({ name: 'receiver_fk', referencedColumnName: 'receiver_id' })
  receiver: Receiver;

  @OneToOne(
    type => DiscPer,
    disc_per => disc_per.ordersheet,
    { eager: true, onDelete: 'CASCADE', nullable: true, primary: false },
  )
  @JoinColumn({ name: 'disc_per_fk', referencedColumnName: 'disc_per_id' })
  discount: DiscPer;

  @ManyToOne(
    type => Office,
    office => office.generated_orders,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
      primary: false,
    },
  )
  @JoinColumn({ name: 'origin_office_fk', referencedColumnName: 'office_id' })
  origin_office: Office;

  @ManyToOne(
    type => Office,
    office => office.delivered_orders,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: true,
      primary: false,
    },
  )
  @JoinColumn({
    name: 'destination_office_fk',
    referencedColumnName: 'office_id',
  })
  destination_office: Office;

  @ManyToOne(type => Place, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'destination_place_fk',
    referencedColumnName: 'place_id',
  })
  destination_place: Place;

  @OneToOne(
    type => Trajectory,
    trajectory => trajectory.ordersheet,
    { cascade: true, eager: true },
  )
  trajectories: Trajectory;

  @ManyToOne(
    type => ItemPriceHist,
    item_price_hist => item_price_hist.ordersheets,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'item_price_hist_fk',
    referencedColumnName: 'item_price_hist_id',
  })
  item_price_hist: ItemPriceHist;

  @OneToMany(
    type => Item,
    item => item.ordersheet,
    { cascade: true, eager: true },
  )
  items: Item[];

  @ManyToOne(
    type => OrderPriceHist,
    order_price_hist => order_price_hist.ordersheets,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'order_type_fk',
    referencedColumnName: 'order_price_hist_id',
  })
  order_price_hist: OrderPriceHist;
}
