import {
  BaseEntity,
  Entity,
  Check,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';

@Entity('commercial_ally')
@Check(`status IN ('ACTIVE','DELETED')`)
export class CommercialAlly extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  commercial_ally_id: string;

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

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @OneToMany(
    type => Warehouse,
    warehouse => warehouse.commercial_ally,
    { cascade: true },
  )
  warehouses: Warehouse[];
}
