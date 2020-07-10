import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  Check,
} from 'typeorm';
import { Userdata } from './userdata.entity';
import { GenderType } from './../constants/gender.enum';
import { LanguageType } from './../constants/language.enum';

@Entity('person')
@Check(`gender IN ('M','F','O')`)
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  person_id: number;

  @OneToOne(
    type => Userdata,
    userdata => userdata.person,
  )
  user: Userdata;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'document' })
  document: string;

  @Column({ type: 'varchar', nullable: false, name: 'first_name' })
  first_name: string;

  @Column({ type: 'varchar', nullable: true, name: 'middle_name' })
  middle_name: string;

  @Column({ type: 'varchar', nullable: false, name: 'last_name' })
  last_name: string;

  @Column({ type: 'varchar', nullable: true, name: 'second_last_name' })
  second_last_name: string;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: true,
    name: 'gender',
    default: GenderType.OTHER,
  })
  gender: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'phone_number' })
  phone_number: string;

  @Column({ type: 'date', nullable: true, name: 'date_of_birth' })
  date_of_birth: Date;

  @Column({
    type: 'varchar',
    name: 'def_language',
    nullable: true,
    default: LanguageType.ENGLISH,
  })
  def_language: string;

  @Column({ type: 'varchar', nullable: true, name: 'picture_url' })
  picture_url: string;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'receive_notifications',
    default: false,
  })
  receive_notifications: Boolean;
}
