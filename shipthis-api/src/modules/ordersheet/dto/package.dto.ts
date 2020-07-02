import { CharNameDto } from './../../item-type/dto/char-name.dto';
export class PackageDto {
  description: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  characteristics: CharNameDto[];
  cost: number;
}
