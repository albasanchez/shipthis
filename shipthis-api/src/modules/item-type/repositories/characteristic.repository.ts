import { Repository, EntityRepository } from 'typeorm';
import { Characteristic } from '../entities/characteristic.entity';
import { CharacteristicStatus } from '../constants/characteristic-status.enum';

@EntityRepository(Characteristic)
export class CharacteristicRepository extends Repository<Characteristic> {
  getAllCharacteristics(): Promise<Characteristic[]> {
    return this.createQueryBuilder('c')
      .innerJoinAndSelect('c.char_price_hists', 'p', 'p.ending_date is null')
      .where('c.status = :st', { st: CharacteristicStatus.ACTIVE })
      .getMany();
  }

  async getCharacteristicById(id: number): Promise<Characteristic> {
    return this.findOne({ where: { characteristic_id: id } });
  }
}
