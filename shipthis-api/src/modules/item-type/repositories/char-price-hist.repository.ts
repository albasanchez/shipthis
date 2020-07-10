import { Repository, EntityRepository } from 'typeorm';
import { CharPriceHist } from '../entities/char-price-hist.entity';
import { Characteristic } from '../entities/characteristic.entity';
import { CharPriceInfoDto } from '../dto/char-price-info.dto';
import { NewCharPriceDto } from '../dto/new-char-price.dto';
import { MapperCharInfo } from '../../../mapper/mapper-char-hist';
import { CharacteristicStatus } from '../constants/characteristic-status.enum';

@EntityRepository(CharPriceHist)
export class CharPriceHistRepository extends Repository<CharPriceHist> {
  async getCharacteristicsInfo(): Promise<CharPriceInfoDto[]> {
    const characteristicsHist: CharPriceHist[] = await this.find({
      where: { ending_date: null },
    });
    const characteristicsInfo: CharPriceInfoDto[] = [];

    characteristicsHist.forEach(char_hist => {
      if (char_hist.characteristic.status == CharacteristicStatus.ACTIVE) {
        characteristicsInfo.push(MapperCharInfo.charHistToCharInfo(char_hist));
      }
    });

    return characteristicsInfo;
  }

  async updateHistory(
    newRegister: NewCharPriceDto,
    char: Characteristic,
  ): Promise<any> {
    const oldRegister: CharPriceHist = await this.findOne({
      where: { ending_date: null, characteristic: char },
    });
    oldRegister.ending_date = new Date();

    this.update(oldRegister.char_price_hist_id, oldRegister);

    const newPriceRegister = {
      starting_date: new Date(),
      ending_date: null,
      tax: newRegister.tax,
      characteristic: char,
    };

    return this.save(newPriceRegister);
  }
}
