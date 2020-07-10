import { IsNotEmpty, IsString, IsIn } from 'class-validator';
export class CreateCommentBoxDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['EN', 'ES'])
  language: string;
}
