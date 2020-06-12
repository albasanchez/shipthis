import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Item } from './../../ordersheet/entities/item.entity';
import { Characteristic } from './characteristic.entity';

@Entity('char_price_hist')
export class CharPriceHist extends BaseEntity {
  @PrimaryGeneratedColumn()
  char_price_hist_id: number;

  @Column({ name: 'starting_date', type: 'date', nullable: false })
  starting_date: Date;

  @Column({ name: 'ending_date', type: 'date', nullable: true })
  ending_date: Date;

  @Column({ name: 'cha_tax', type: 'numeric', nullable: false })
  tax: number;

  @ManyToOne(
    type => Characteristic,
    characteristic => characteristic.char_price_hists,
    { eager: true, onDelete: 'CASCADE', nullable: false },
  )
  @JoinColumn({
    name: 'characteristic_fk',
    referencedColumnName: 'characteristic_id',
  })
  characteristic: Characteristic;

  @ManyToMany(
    type => Item,
    item => item.characteristics,
  )
  char_items: Item[];
}
