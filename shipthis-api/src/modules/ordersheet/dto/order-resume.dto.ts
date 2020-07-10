import { Trajectory } from './../entities/trajectory.entity';
import { PackageDto } from './package.dto';
import { PersonInfoDto } from './../../userdata/dto/person-info.dto';
import { Place } from './../entities/place.entity';
export class OrderResumeDto {
  ordersheet_id: number;
  creation_date: Date;
  delivery_date: Date;
  status: string;
  origin_place: Place;
  destination_place: Place;
  order_type: string;
  ignore_holidays: boolean;
  discount: number;
  subtotal: number;
  additional_taxes: number;
  facturation_amount: number;
  shipper: PersonInfoDto;
  receiver: PersonInfoDto;
  packages: PackageDto[];
  trajectory: Trajectory;
}
