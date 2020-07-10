import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class TranslationDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['ES', 'EN'])
  language: string;
}
