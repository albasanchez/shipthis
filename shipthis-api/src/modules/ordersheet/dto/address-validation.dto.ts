import { IsString, IsNotEmpty } from 'class-validator';
export class AddressValidationDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
