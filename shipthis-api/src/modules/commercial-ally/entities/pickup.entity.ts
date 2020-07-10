import { Trajectory } from './../../ordersheet/entities/trajectory.entity';
import { Item } from './../../ordersheet/entities/item.entity';
import { Place } from './../../ordersheet/entities/place.entity';
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
import { Warehouse } from './warehouse.entity';
import { ItemPriceHist } from '../../item-type/entities/item-price-hist.entity';
import { PickupStatus } from '../constants/pickup-status.enum';

@Entity('pickup')
@Check(`pickup_status IN ('DELIVERY','TRANSIT','DELIVERED')`)
export class Pickup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  pickup_id: number;

  @Column({ name: 'rec_name', type: 'varchar', nullable: false })
  rec_name: string;

  @Column({ name: 'rec_last_name', type: 'varchar', nullable: false })
  rec_last_name: string;

  @Column({ name: 'rec_phone_number', type: 'varchar', nullable: false })
  rec_phone_numer: string;

  @Column({ name: 'rec_email', type: 'varchar', nullable: false })
  rec_email: string;

  @Column({ name: 'creation_date', type: 'date', nullable: false })
  creation_date: Date;

  @Column({ name: 'delivery_date', type: 'date', nullable: true })
  delivery_date: Date;

  @Column({
    type: 'varchar',
    enum: PickupStatus,
    default: PickupStatus.DELIVERY,
    name: 'pickup_status',
  })
  status: string;

  @Column({ type: 'numeric', nullable: true, name: 'facturation_amount' })
  facturation_amount: number;

  @ManyToOne(
    type => Warehouse,
    warehouse => warehouse.generated_pickups,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'warehouse_fk', referencedColumnName: 'warehouse_id' })
  origin_warehouse: Warehouse;

  @ManyToOne(type => Place, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
    nullable: false,
    primary: false,
  })
  @JoinColumn({
    name: 'destination_place_fk',
    referencedColumnName: 'place_id',
  })
  destination_place: Place;

  @ManyToOne(
    type => ItemPriceHist,
    item_price_hist => item_price_hist.pickups,
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
    item => item.pickup,
    { cascade: true, eager: true },
  )
  items: Item[];

  @OneToOne(
    type => Trajectory,
    trajectory => trajectory.pickup,
    { cascade: true, eager: true },
  )
  trajectories: Trajectory;
}
