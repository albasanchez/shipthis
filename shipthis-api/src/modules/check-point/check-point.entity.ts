import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Timestamp,
} from 'typeorm';
import { Trajectory } from '../trajectory/trajectory.entity';
import { Place } from '../place/place.entity';

@Entity('check_box')
export class CheckPoint extends BaseEntity {
  @PrimaryGeneratedColumn()
  check_point_id: number;

  @ManyToOne(
    type => Trajectory,
    trajectory => trajectory.check_points,
    {
      nullable: false,
      primary: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'trajectory_fk', referencedColumnName: 'trajectory_id' })
  trajectory: Trajectory;

  @ManyToOne(type => Place, {
    nullable: false,
    primary: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'place_fk', referencedColumnName: 'place_id' })
  place: Place;

  @Column({ type: 'integer', nullable: false, name: 'check_point_order' })
  check_point_order: number;

  @Column({ type: 'timestamp', nullable: true, name: 'time_mark' })
  time_mark: Timestamp;
}
