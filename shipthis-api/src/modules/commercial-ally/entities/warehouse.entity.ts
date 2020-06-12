import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Place } from './../../ordersheet/entities/place.entity';
import { CommercialAlly } from './commercial-ally.entity';
import { Pickup } from './pickup.entity';

@Entity('warehouse')
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  warehouse_id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(
    type => CommercialAlly,
    commercialAlly => commercialAlly.warehouses,
    {
      eager: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'commercial_ally_fk',
    referencedColumnName: 'commercial_ally_id',
  })
  commercial_ally: CommercialAlly;

  @ManyToOne(type => Place, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'place_fk', referencedColumnName: 'place_id' })
  place: Place;

  @OneToMany(
    type => Pickup,
    pickup => pickup.origin_warehouse,
  )
  generated_pickups: Pickup[];
}
