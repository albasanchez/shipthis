import { CheckPoint } from './../ordersheet/entities/check-point.entity';
import { Trajectory } from 'src/modules/ordersheet/entities/trajectory.entity';
import { Pickup } from './../commercial-ally/entities/pickup.entity';
import { OrdersheetRepository } from './../ordersheet/repositories/ordersheet.repository';
import { PickupRepository } from './../commercial-ally/repositories/pickup.repository';
import { Configuration } from './../../config/config.keys';
import { ConfigService } from './../../config/config.service';
import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { AppLoggerService } from 'src/log/applogger.service';
import { Ordersheet } from '../ordersheet/entities/ordersheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService implements OnModuleInit {
  constructor(
    private readonly _configService: ConfigService,
    private httpService: HttpService,
    private readonly _appLogger: AppLoggerService,
    @InjectRepository(PickupRepository)
    private readonly _pickupRepo: PickupRepository,
    @InjectRepository(OrdersheetRepository)
    private readonly _orderRepo: OrdersheetRepository,
  ) {}

  onModuleInit() {
    const localURL = `${this._configService.get(
      Configuration.BACKEND_URL,
    )}/shipthisapi/v1`;
    this.httpService.get(localURL).subscribe(() => {
      this._appLogger.log('Telegram bot iniciated');
    });
    this.botMessage();
  }

  botMessage() {
    process.env.NTBA_FIX_319 = '1';

    const token = this._configService.get(Configuration.TELEGRAM_ACCESS_TOKEN);

    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, msg => {
      //Welcome message
      const user: any = msg.from.id;
      const username: string = msg.from.first_name;
      const answer: string = this.createWelcomeMessage(username);

      bot.sendMessage(user, answer, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Check order detail', callback_data: 'Detailbutton' },
              { text: 'Track an Order', callback_data: 'Trackbutton' },
            ],
          ],
        },
      });
    });

    bot.on('callback_query', function onCallbackQuery(action) {
      const data = action.data;
      const user = action.message.chat.id;

      if (data == 'Detailbutton') {
        bot.sendMessage(user, 'Introduce /detail your_order_id');
      }

      if (data == 'Trackbutton') {
        bot.sendMessage(user, 'Introduce /track your_order_id');
      }
    });

    bot.onText(/\/help/, msg => {
      //extracting user info
      const user: any = msg.from.id;
      const username: string = msg.from.first_name;

      //create response message
      const answer: string = this.createHelpMessage(username);
      //send message
      bot.sendMessage(user, answer);
    });

    bot.onText(/\/detail (.+)/, async (msg, input) => {
      //user info
      const user: any = msg.from.id;
      const username: string = msg.from.first_name;

      //tracking order
      const trackingID: string = this.readTrackingID(input[1]);
      let answer: string;
      if (trackingID) {
        const order: Ordersheet = await this._orderRepo.fetchOrder(trackingID);
        let pickup: Pickup = null;
        if (order) {
          answer = this.createDetailFromOrder(order, username);
        } else {
          pickup = await this._pickupRepo.fetchPickup(trackingID);
          if (pickup) {
            answer = this.createDetailFromPickup(pickup, username);
          } else {
            answer = this.createAnswerForUnregisteredTrackingID(username);
          }
        }
      } else {
        answer = this.createAnswerForBadTrackinID(username);
      }

      // send answer
      bot.sendMessage(user, answer, { parse_mode: 'Markdown' });
    });

    bot.onText(/\/track (.+)/, async (msg, input) => {
      //user info
      const user: any = msg.from.id;
      const username: string = msg.from.first_name;

      //tracking order
      const trackingID: string = this.readTrackingID(input[1]);
      if (trackingID) {
        const order: Ordersheet = await this._orderRepo.fetchOrder(trackingID);
        let pickup: Pickup = null;
        const messages: string[] = [];
        if (order) {
          messages.push(this.createFirsMesaggeForTracking(username));
          messages.push(this.createCreationOrderMessage(order.creation_date));
          this.insertCheckpointsMessages(messages, order.trajectories);
          if (order.delivery_date)
            messages.push(
              this.createDeliveryOrderMessage(
                order.delivery_date,
                `${order.receiver.name} ${order.receiver.last_name}`,
                order.destination_office
                  ? order.destination_office.place.address
                  : order.destination_place.address,
              ),
            );
          bot.sendMessage(user, messages.join('\n\n'), {
            parse_mode: 'Markdown',
          });
        } else {
          pickup = await this._pickupRepo.fetchPickup(trackingID);
          if (pickup) {
            messages.push(this.createFirsMesaggeForTracking(username));
            messages.push(
              this.createCreationOrderMessage(pickup.creation_date),
            );
            this.insertCheckpointsMessages(messages, pickup.trajectories);
            if (pickup.delivery_date)
              messages.push(
                this.createDeliveryOrderMessage(
                  pickup.delivery_date,
                  `${pickup.rec_name} ${pickup.rec_last_name}`,
                  pickup.destination_place.address,
                ),
              );
            bot.sendMessage(user, messages.join('\n\n'), {
              parse_mode: 'Markdown',
            });
          } else {
            bot.sendMessage(
              user,
              this.createAnswerForUnregisteredTrackingID(username),
              { parse_mode: 'Markdown' },
            );
          }
        }
      } else {
        bot.sendMessage(user, this.createAnswerForBadTrackinID(username), {
          parse_mode: 'Markdown',
        });
      }
    });
  }

  private createDeliveryOrderMessage(
    date: Date,
    receiver: string,
    location: string,
  ): string {
    let message = `*Date*: ${date}\n`;
    message += `*Detail*: Order was delivered to ${receiver} at ${location}`;
    return message;
  }

  private insertCheckpointsMessages(
    mesagges: string[],
    trajectory: Trajectory,
  ): void {
    trajectory.check_points = trajectory.check_points.sort((a, b) =>
      a.check_point_order > b.check_point_order ? 1 : -1,
    );

    trajectory.check_points.map(check_point => {
      if (check_point.time_mark)
        mesagges.push(this.createCheckpointMessage(check_point));
    });
  }

  private createCheckpointMessage(check_point: CheckPoint): string {
    let message = `*Date*: ${check_point.time_mark}\n`;
    message += `*Detail*: Order was located at ${check_point.place.address}`;
    return message;
  }

  private createCreationOrderMessage(date: Date): string {
    let message = `*Date*: ${date}\n`;
    message += `*Detail*: Order was created`;
    return message;
  }

  private createFirsMesaggeForTracking(username: string): string {
    let message = `Great ${username}, I've found the order you wanted to track.\n`;
    message += `Here is the activity from that order:`;
    return message;
  }

  private readTrackingID(trackindID: string): string {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const matches = trackindID.match(regex);
    return matches ? matches[0] : null;
  }

  private createDetailFromOrder(order: Ordersheet, username: string): string {
    let message: string = null;
    message = `Great ${username}, I've found the order you wanted to track:\n\n`;
    message += `*Order status*: ${order.status}`;
    message += `\n*Creation date*: ${order.creation_date}`;
    message += `\n*Origin office*: ${order.origin_office.place.address}`;
    message += `\n*Destinatary*: ${order.receiver.name} ${order.receiver.last_name}`;
    message += `\n*Destination address*: ${
      order.destination_office
        ? order.destination_office.place.address
        : order.destination_place.address
    }`;
    message += `\n*Delivery date*: ${
      order.delivery_date ? order.delivery_date : 'WAIT FOR IT'
    }`;
    return message;
  }

  private createDetailFromPickup(pickup: Pickup, username: string): string {
    let message: string = null;
    message = `Great ${username}, I've found the order you wanted to track:\n\n`;
    message += `*Order status*: ${pickup.status}`;
    message += `\n*Creation date*: ${pickup.creation_date}`;
    message += `\n*Destinatary*: ${pickup.rec_name} ${pickup.rec_last_name}`;
    message += `\n*Destination address*: ${pickup.destination_place.address}`;
    message += `\n*Delivery date*: ${
      pickup.delivery_date ? pickup.delivery_date : 'WAIT FOR IT'
    }`;
    return message;
  }

  private createAnswerForBadTrackinID(username: string) {
    return `I'm sorry ${username}. It seems like you inserted a trackingID with a BAD STRUCTURE`;
  }

  private createAnswerForUnregisteredTrackingID(username: string): string {
    return `I'm sorry ${username}. It seems like your trackingID is not register on the platform`;
  }

  private createWelcomeMessage(username: string): string {
    const message = `Welcome ${username}. I'm TocToc, The *Shipthis Bot* who is here to *help you* tracking your orders.\nWhat can I do for you?`;
    return message;
  }

  private createHelpMessage(username: string): string {
    const message = `Hello ${username}. For start using our my services just type \/start and you'll get information about all the funtionalities I have and how you can use them`;
    return message;
  }
}
