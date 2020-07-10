import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class ModifyPasswordDTO {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  actual_password: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;
}
