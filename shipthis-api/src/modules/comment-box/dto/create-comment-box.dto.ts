import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class CreateCommentBoxDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
