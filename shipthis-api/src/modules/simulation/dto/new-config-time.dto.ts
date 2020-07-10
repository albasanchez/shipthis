import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class NewConfigTimeDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(59)
  config_time: number;
}
