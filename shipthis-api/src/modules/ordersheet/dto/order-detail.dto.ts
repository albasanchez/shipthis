import { IsNotEmpty, IsUUID } from 'class-validator';
export class OrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  tracking_id: string;
}
