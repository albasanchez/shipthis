import { PackageDto } from './../modules/ordersheet/dto/package.dto';
import { Item } from './../modules/ordersheet/entities/item.entity';
import { MapperCharName } from './mapper-char-name';
export class MapperPackage {
  static generatePackageDtoFromItem(item: Item): PackageDto {
    const pack: PackageDto = new PackageDto();
    pack.description = item.description ? item.description : null;
    pack.weight = item.item_weight;
    pack.height = item.item_height;
    pack.length = item.item_length;
    pack.width = item.item_width;
    pack.characteristics = MapperCharName.generateCharNameArrayFromCharPriceHistArray(
      item.characteristics,
    );
    pack.cost = item.item_cost;
    return pack;
  }

  static generatePackageDtoArrayFromItemArray(items: Item[]): PackageDto[] {
    const package_array: PackageDto[] = [];
    items.map(item =>
      package_array.push(this.generatePackageDtoFromItem(item)),
    );
    return package_array;
  }
}
