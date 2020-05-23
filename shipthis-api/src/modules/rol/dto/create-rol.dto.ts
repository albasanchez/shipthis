import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateRolDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly rol_id: number;
}
