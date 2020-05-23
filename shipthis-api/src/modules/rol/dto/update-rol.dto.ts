import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateRolDto {
  @IsNotEmpty()
  @IsString()
  readonly rol_name: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly rol_id: number;
}
