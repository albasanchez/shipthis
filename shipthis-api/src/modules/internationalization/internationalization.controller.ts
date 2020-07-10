import { InternationalizationService } from './internationalization.service';
import { TranslationDto } from './dto/translation.dto';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('internationalization')
export class InternationalizationController {
  constructor(private readonly _translationServ: InternationalizationService) {}

  @Post('get-dictionary')
  @UsePipes(ValidationPipe)
  getDictionary(@Body() dict: TranslationDto) {
    return this._translationServ.getDictionary(dict.language);
  }
}
