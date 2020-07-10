import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Pickup } from './../../commercial-ally/entities/pickup.entity';
import { Ordersheet } from './ordersheet.entity';
import { CheckPoint } from './check-point.entity';

@Entity('trajectory')
export class Trajectory extends BaseEntity {
  @PrimaryGeneratedColumn()
  trajectory_id: number;

  @Column({ type: 'numeric', nullable: true, name: 'distance' })
  distance: number;

  @OneToOne(
    type => Ordersheet,
    ordersheet => ordersheet.trajectories,
    {
      nullable: true,
      primary: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'ordersheet_fk', referencedColumnName: 'ordersheet_id' })
  ordersheet: Ordersheet;

  @OneToOne(
    type => Pickup,
    pickup => pickup.trajectories,
    {
      nullable: true,
      primary: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'pickup_fk', referencedColumnName: 'pickup_id' })
  pickup: Pickup;

  @OneToMany(
    type => CheckPoint,
    check_point => check_point.trajectory,
    { cascade: true, eager: true },
  )
  check_points: CheckPoint[];
}
