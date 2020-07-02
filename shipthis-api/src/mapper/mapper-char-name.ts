import { CharNameDto } from './../modules/item-type/dto/char-name.dto';
import { CharPriceHist } from './../modules/item-type/entities/char-price-hist.entity';
export class MapperCharName {
  static generateCharNameDtoFromCharPriceHist(
    char_price: CharPriceHist,
  ): CharNameDto {
    const char_name = new CharNameDto();
    char_name.name = char_price.characteristic.name;
    return char_name;
  }

  static generateCharNameArrayFromCharPriceHistArray(
    char_prices: CharPriceHist[],
  ): CharNameDto[] {
    const char_name_array: CharNameDto[] = [];
    char_prices.map(char_price =>
      char_name_array.push(
        this.generateCharNameDtoFromCharPriceHist(char_price),
      ),
    );
    return char_name_array;
  }
}
