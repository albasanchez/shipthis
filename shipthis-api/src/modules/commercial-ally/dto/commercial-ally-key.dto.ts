import { IsNotEmpty, IsUUID } from 'class-validator';
export class CommercialAllyKeyDto {
  @IsUUID()
  @IsNotEmpty()
  commercial_ally_key: string;
}
