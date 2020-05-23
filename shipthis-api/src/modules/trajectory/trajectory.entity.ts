import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ordersheet } from '../ordersheet/ordersheet.entity';
import { CheckPoint } from '../check-point/check-point.entity';

@Entity('trajectory')
export class Trajectory extends BaseEntity {
  @PrimaryGeneratedColumn()
  trajectory_id: number;

  @ManyToOne(
    type => Ordersheet,
    ordersheet => ordersheet.trajectories,
    { nullable: false, primary: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'ordersheet_fk', referencedColumnName: 'ordersheet_id' })
  ordersheet: Ordersheet;

  @Column({ type: 'numeric', nullable: true, name: 'linear_distance' })
  linear_distance: number;

  @Column({ type: 'numeric', nullable: true, name: 'efective_distance' })
  efective_distance: number;

  @OneToMany(
    type => CheckPoint,
    check_point => check_point.trajectory,
    { cascade: true },
  )
  check_points: CheckPoint[];
}
