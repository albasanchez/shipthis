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

@Entity('commercial_ally')
export class CommercialAlly extends BaseEntity {
  @PrimaryGeneratedColumn()
  commercial_ally_id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ name: 'manager_name', type: 'varchar', nullable: false })
  manager_name: string;

  @Column({ name: 'manager_last_name', type: 'varchar', nullable: false })
  manager_last_name: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @OneToMany(
    type => Warehouse,
    warehouse => warehouse.commercial_ally,
  )
  warehouses: Warehouse[];
}
