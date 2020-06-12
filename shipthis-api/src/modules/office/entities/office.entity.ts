import { Place } from './../../ordersheet/entities/place.entity';
import { Ordersheet } from './../../ordersheet/entities/ordersheet.entity';
import {
  BaseEntity,
  Entity,
  Check,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OfficeStatus } from './../constants/office-status.enum';
@Entity('office')
@Check(`office_status IN ('ACTIVE','BLOCKED')`)
export class Office extends BaseEntity {
  @PrimaryGeneratedColumn()
  office_id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    name: 'office_name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    name: 'phone_number',
  })
  phone_number: string;

  @Column({
    type: 'varchar',
    default: OfficeStatus.ACTIVE,
    nullable: false,
    name: 'office_status',
  })
  status: string;

  @ManyToOne(
    type => Place,
    place => place.offices,
    {
      nullable: false,
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'place_fk', referencedColumnName: 'place_id' })
  place: Place;

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.origin_office,
  )
  generated_orders: Ordersheet[];

  @OneToMany(
    type => Ordersheet,
    ordersheet => ordersheet.origin_office,
  )
  delivered_orders: Ordersheet[];
}
