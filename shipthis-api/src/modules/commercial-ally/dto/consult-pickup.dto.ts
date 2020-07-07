import { IsUUID, IsNotEmpty } from 'class-validator';
export class ConsultPickupDto {
  @IsUUID()
  @IsNotEmpty()
  tracking_id: string;
}
