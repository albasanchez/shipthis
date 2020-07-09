import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';
export class UpdateReviewedDTO {
  @IsNotEmpty()
  @IsInt()
  comment_id: number;

  @IsNotEmpty()
  @IsBoolean()
  reviewed: boolean;
}
