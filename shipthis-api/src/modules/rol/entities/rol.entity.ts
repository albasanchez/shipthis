import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Userdata } from './../../userdata/entities/userdata.entity';

@Entity('rol')
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  rol_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'rol_name',
  })
  name: string;

  @OneToMany(
    type => Userdata,
    userdata => userdata.rol,
  )
  users: Userdata[];
}
