import { Office } from './../../office/entities/office.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('place')
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  place_id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
    name: 'place_address',
  })
  address: string;

  @Column({ type: 'numeric', nullable: true, name: 'position_lat' })
  position_lat: number;

  @Column({ type: 'numeric', nullable: true, name: 'position_long' })
  position_long: number;

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'zip_code' })
  zip_code: string;

  @OneToMany(
    type => Office,
    office => office.place,
  )
  offices: Office[];
}
