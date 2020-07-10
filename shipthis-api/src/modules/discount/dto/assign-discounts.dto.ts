import { Option } from './../../discount/constants/option.enum';

import { IsNotEmpty, IsNumber, IsIn } from 'class-validator';
export class AssignDiscountsDto {
  @IsNumber()
  @IsNotEmpty()
  @IsIn([
    Option.MORE_ACTIVE_USERS,
    Option.LESS_ACTIVE_USERS,
    Option.ALL_USERS,
    Option.NEW_USERS,
  ])
  option: number;

  @IsNumber()
  @IsNotEmpty()
  discount_id: number;
}
