import { TelegramService } from './telegram.service';
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly _telegramService: TelegramService) {}

  @Get()
  getBotDialog(@Res() res) {
    this._telegramService.botMessage();
    res.status(HttpStatus.OK).send('Bot service started');
  }
}
