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
import { Userdata } from '../userdata/userdata.entity';
import { Office } from '../office/office.entity';
import { OrderPriceHist } from '../order-price-hist/order-price-hist.entity';
import { OrdersheetStatus } from './constants/ordersheet-status.enum';
import { Place } from '../place/place.entity';
import { Item } from '../item/item.entity';
import { Trajectory } from '../trajectory/trajectory.entity';

@Entity('ordersheet')
@Check(`order_status IN ('GENERATED','DELIVERY','TRANSIT','DELIVERED')`)
export class Ordersheet extends BaseEntity {
  @PrimaryGeneratedColumn()
  ordersheet_id: number;

  @ManyToOne(
    type => Userdata,
    userdata => userdata.ordersheets,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: false,
      primary: false,
    },
  )
  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_id' })
  user: Userdata;

  @ManyToOne(
    type => Office,
    office => office.generated_orders,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: false,
      primary: false,
    },
  )
  @JoinColumn({ name: 'origin_office_fk', referencedColumnName: 'office_id' })
  origin_office: Office;

  @ManyToOne(
    type => OrderPriceHist,
    order_price_hist => order_price_hist.ordersheets,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'order_type_fk',
    referencedColumnName: 'order_price_hist_id',
  })
  order_price_hist: OrderPriceHist;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    name: 'tracking_number',
  })
  tracking_number: string;

  @Column({ type: 'date', nullable: false, name: 'creation_date' })
  creation_date: Date;

  @Column({
    type: 'varchar',
    enum: OrdersheetStatus,
    default: OrdersheetStatus.GENERATED,
    name: 'order_status',
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    name: 'rec_fullname',
  })
  rec_fullname: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    name: 'rec_phone_code',
  })
  rec_phone_code: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    name: 'rec_phone_number',
  })
  rec_phone_number: string;

  @Column({ type: 'date', nullable: true, name: 'delivery_date' })
  delivery_date: Date;

  @Column({ type: 'date', nullable: true, name: 'date_to_be_delivered' })
  date_to_be_delivered: Date;

  @Column({ type: 'date', nullable: true, name: 'facturation_date' })
  facturation_date: Date;

  @Column({ type: 'numeric', nullable: true, name: 'facturation_amount' })
  facturation_amount: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
    name: 'ignore_hollydays',
  })
  ignore_hollydays: boolean;

  @ManyToOne(
    type => Office,
    office => office.delivered_orders,
    {
      eager: true,
      cascade: true,
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

  @OneToMany(
    type => Item,
    item => item.ordersheet,
  )
  items: Item[];

  @OneToMany(
    type => Trajectory,
    trajectory => trajectory.ordersheet,
    { cascade: true, eager: true },
  )
  trajectories: Trajectory[];
}
