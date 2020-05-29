import { OrdersheetRepository } from './../ordersheet/ordersheet.repository';
import { Configuration } from './../../config/config.keys';
import { ConfigService } from './../../config/config.service';
import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { AppLoggerService } from 'src/log/applogger.service';
import { getConnection } from 'typeorm';
import { Ordersheet } from '../ordersheet/ordersheet.entity';

@Injectable()
export class TelegramService implements OnModuleInit {
  constructor(
    private readonly _configService: ConfigService,
    private httpService: HttpService,
    private readonly _appLogger: AppLoggerService,
  ) {}

  onModuleInit() {
    const localURL: string = 'http://localhost:3000/shipthisapi/v1';
    this.httpService.get(localURL).subscribe(() => {
      this._appLogger.log('Telegram bot iniciated');
    });
    this.botMessage();
  }

  botMessage() {
    process.env.NTBA_FIX_319 = '1';
    const TelegramBot = require('node-telegram-bot-api');

    const token = this._configService.get(Configuration.TELEGRAM_ACCESS_TOKEN);

    const bot = new TelegramBot(token, { polling: true });

    // Matches "/echo [whatever]"
    bot.onText(/\/start/, msg => {
      //Welcome message
      let user: any = msg.from.id;
      let username: string = msg.from.first_name;

      const chatId = msg.chat.id;
      let resp: string = `Welcome ${username.toUpperCase()}. I'm TocToc, The Shipthis BOT who is here to HELP YOU tacking your orders.`;
      resp += `\n\n You can start tracking your order by typing: \n \/trackorder tracking_id_number\nAnd then I'll provide all the information you need`;
      resp += `\n\nFor further instructions try the \/help comand`;

      bot.sendMessage(user, resp);
    });

    bot.onText(/\/help/, msg => {
      //user info
      let user: any = msg.from.id;
      let username: string = msg.from.first_name;

      //create response message
      let resp: string = `Excuse us ${username}. We are working on this method.\nPerhaps after FASE2 it will be ready!!\n\nHave a sit and WAIT FOR IT.`;

      //send message
      bot.sendMessage(user, resp);
    });

    bot.onText(/\/trackorder (.+)/, async (msg, input) => {
      //user info
      let user: any = msg.from.id;
      let username: string = msg.from.first_name;

      let regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      //tracking order
      const trackingID: string = input[1];
      let resp: string;
      if (trackingID.match(regex)) {
        const orderRepo: OrdersheetRepository = getConnection().getRepository(
          Ordersheet,
        );
        const order: Ordersheet = await orderRepo.findOne({
          where: { ordersheet_id: trackingID },
        });

        if (!order) {
          resp = `I'm sorry ${username}. It seems like you trackingID is not register on the platform`;
        } else {
          resp = `ORDER STATUS: ${order.status}`;
          resp += `\nCREATION DATE: ${order.creation_date}`;
          resp += `\nORIGIN OFFICE: ${order.origin_office.place.address}`;
          resp += `\nDESTINARATY: ${order.rec_fullname}`;
          resp += `\nDESTINATION ADDRESS: ${
            order.destination_office
              ? order.destination_office.place.address
              : order.destination_place.address
          }`;
          resp += `\nDELIVERY DATE: ${
            order.delivery_date ? order.delivery_date : 'WAIT FOR IT'
          }`;
        }
      } else {
        resp = `I'm sorry ${username}. It seems like you inserted a trackingID with a BAD STRUCTURE`;
      }

      // send answer
      bot.sendMessage(user, resp);
    });
  }
}
