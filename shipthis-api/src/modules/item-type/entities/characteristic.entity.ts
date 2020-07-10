import { CharacteristicStatus } from './../constants/characteristic-status.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
} from 'typeorm';
import { CharPriceHist } from './char-price-hist.entity';

@Entity('characteristic')
@Check(`cha_status IN ('ACTIVE','BLOCKED')`)
export class Characteristic extends BaseEntity {
  @PrimaryGeneratedColumn()
  characteristic_id: number;

  @Column({ name: 'cha_name', type: 'varchar', nullable: false })
  name: string;

  @Column({
    name: 'cha_status',
    type: 'varchar',
    nullable: false,
    default: CharacteristicStatus.ACTIVE,
  })
  status: string;

  @OneToMany(
    type => CharPriceHist,
    char_price_hist => char_price_hist.characteristic,
  )
  char_price_hists: CharPriceHist[];
}
