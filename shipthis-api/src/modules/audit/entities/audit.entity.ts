import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Userdata } from '../../userdata/entities/userdata.entity';
import { AuditActions } from '../constants/audit-actions.enum';

@Entity('audit')
export class Audit extends BaseEntity {
  @PrimaryGeneratedColumn()
  audit_id: number;

  @Column({
    type: 'varchar',
    enum: AuditActions,
    name: 'action',
    nullable: false,
  })
  action: string;

  @Column({ name: 'table', type: 'text', nullable: false })
  table: string;

  @Column({ name: 'row', type: 'text', nullable: false })
  row: string;

  @Column({ name: 'attribute', type: 'text', nullable: true })
  attribute: string;

  @Column({ name: 'old_value', type: 'text', nullable: true })
  old_value: string;

  @Column({ name: 'new_value', type: 'text', nullable: true })
  new_value: string;

  @CreateDateColumn({ name: 'event_date' })
  eventDate: Date;

  @JoinColumn({ name: 'user_fk', referencedColumnName: 'user_id' })
  @ManyToOne((type) => Userdata, (user) => user.audit, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: Partial<Userdata>;
}
