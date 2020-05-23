import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Check,
  OneToMany,
} from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { UserdataRegistrationType } from './constants/user-registration.enum';
import { UserdataStatus } from './constants/user-status.enum';
import { Person } from '../person/person.entity';
import { Ordersheet } from '../ordersheet/ordersheet.entity';

@Entity('userdata')
@Check(`registration_type IN ('REGULAR','FACEBOOK','GOOGLE')`)
@Check(`user_status IN ('ACTIVE','BLOCKED','RESETED')`)
export class Userdata extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToOne(
    type => Person,
    person => person.user,
    {
      nullable: false,
      primary: false,
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'person_fk', referencedColumnName: 'person_id' })
  person: Person;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    name: 'user_email',
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    name: 'user_name',
  })
  username: string;

  @Column({ type: 'varchar', nullable: false, name: 'user_password' })
  password: string;

  @Column({ type: 'date', nullable: false, name: 'registration_date' })
  registration_date: Date;

  @Column({
    nullable: false,
    type: 'varchar',
    enum: UserdataRegistrationType,
    default: UserdataRegistrationType.REGULAR,
    name: 'registration_type',
  })
  registration_type: string;

  @Column({
    nullable: false,
    type: 'varchar',
    enum: UserdataStatus,
    default: UserdataStatus.ACTIVE,
    name: 'user_status',
  })
  status: string;

  @ManyToOne(
    type => Rol,
    rol => rol.users,
    { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'rol_fk', referencedColumnName: 'rol_id' })
  rol: Rol;

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.user,
  )
  ordersheets: Ordersheet[];
}
