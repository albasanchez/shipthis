import { IsNotEmpty, IsString, IsInt, IsPositive, IsIn } from 'class-validator';
import { UserdataStatus } from '../constants/user-status.enum';

export class UpdateUserStatusDTO {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([UserdataStatus.ACTIVE, UserdataStatus.BLOCKED])
  status: UserdataStatus;
}
