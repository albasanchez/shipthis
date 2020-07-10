import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('simulation')
export class Simulation extends BaseEntity {
  @PrimaryGeneratedColumn()
  simulation_id: number;

  @Column({ type: 'date', nullable: false, name: 'starting_date' })
  starting_date: Date;

  @Column({ type: 'date', nullable: true, name: 'ending_date' })
  ending_date: Date;

  @Column({ type: 'numeric', nullable: false, name: 'config_time' })
  config_time: number;
}
