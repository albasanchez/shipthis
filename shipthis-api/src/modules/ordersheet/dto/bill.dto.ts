import { PersonInfoDto } from './../../userdata/dto/person-info.dto';
import { PackageDto } from './package.dto';
export class BillDto {
  ordersheet_id: number;
  creation_date: Date;
  origin: string;
  destination: string;
  order_type: string;
  ignore_holidays: boolean;
  discount: number;
  subtotal: number;
  additional_taxes: number;
  facturation_amount: number;
  shipper: PersonInfoDto;
  receiver: PersonInfoDto;
  packages: PackageDto[];
}
