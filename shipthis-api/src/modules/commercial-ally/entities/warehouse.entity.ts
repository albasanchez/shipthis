import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  Check,
} from 'typeorm';
import { Place } from './../../ordersheet/entities/place.entity';
import { CommercialAlly } from './commercial-ally.entity';
import { Pickup } from './pickup.entity';

@Check(`status IN ('ACTIVE','DELETED')`)
@Entity('warehouse')
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  warehouse_id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @ManyToOne(
    type => CommercialAlly,
    commercialAlly => commercialAlly.warehouses,
    {
      onDelete: 'CASCADE',
      nullable: false,
      eager: true,
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
    cascade: true,
  })
  @JoinColumn({ name: 'place_fk', referencedColumnName: 'place_id' })
  place: Place;

  @OneToMany(
    type => Pickup,
    pickup => pickup.origin_warehouse,
  )
  generated_pickups: Pickup[];
}
