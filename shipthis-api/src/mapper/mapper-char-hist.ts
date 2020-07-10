import { CharPriceInfoDto } from '../modules/item-type/dto/char-price-info.dto';
import { CharPriceHist } from '../modules/item-type/entities/char-price-hist.entity';

export class MapperCharInfo {

    static charHistToCharInfo(char_hist: CharPriceHist): CharPriceInfoDto{

        const charInfo: CharPriceInfoDto = {
            id: char_hist.characteristic.characteristic_id,
            name : char_hist.characteristic.name,
            tax: char_hist.tax,
        };  
           return charInfo;      
     }
}