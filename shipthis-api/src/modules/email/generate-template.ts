import { Injectable } from '@nestjs/common';
import { Configuration } from '../../config/config.keys';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class GenerateTemplate {
  constructor(private readonly configService: ConfigService) {}

  recovery(passwordUrl: string, email: string) {
    return {
      to: email,
      from: this.configService.get(Configuration.SEND_GRID_EMAIL),
      templateId: this.configService.get(
        Configuration.SEND_GRID_RECOVERY_TEMPLATE,
      ),
      dynamicTemplateData: {
        sender_name: 'Ship This',
        title: 'Change your Ship This password!',
        subject: 'Change your Ship This password!',
        email_body: `Change your <strong>Ship This</strong> clicking the button. <br> If you didn't expect this email, you can ignore it`,
        thanks: 'Thank you for choosing us!',
        password: {
          button: 'Change your password',
          url: passwordUrl,
        },
        column1: {
          keyword: 'Ship',
          description: "Anywhere in the US! It's quick and simple",
        },
        column2: {
          keyword: 'Track',
          description:
            "Your shipment's delivery process using our Telegram bot",
        },
        column3: {
          keyword: 'Take care',
          description: 'Stay safe. Leave the rest to us!',
        },
        network_name: 'Ship This',
        network_url: this.configService.get(Configuration.FRONTEND_URL),
        bot_name: 'Ship This Bot',
        bot_url: this.configService.get(Configuration.BOT_URL),
      },
    };
  }

  welcome(
    email: string,
    name: string,
    lastname: string,
    dis_name: string,
    percentage: number,
  ) {
    return {
      to: email,
      from: this.configService.get(Configuration.SEND_GRID_EMAIL),
      templateId: this.configService.get(Configuration.SEND_GRID_TEMPLATE),
      dynamicTemplateData: {
        sender_name: 'Ship This',
        title: 'Welcome to Ship This!',
        subject: 'Welcome to Ship This!',
        email_body: `${name} ${lastname}, thank you for signing up <br> With <strong>Ship This</strong> you can send your packages all over the US. <br> To celebrate that you chose us, we will give you a discount to start your experience with us!`,
        thanks: 'Welcome to Ship This',
        announcement: {
          description: `${dis_name} DISCOUNT`,
          resume: `-${percentage}%`,
        },
        column1: {
          keyword: 'Ship',
          description: "Anywhere in the US! It's quick and simple",
        },
        column2: {
          keyword: 'Track',
          description:
            "Your shipment's delivery process using our Telegram bot",
        },
        column3: {
          keyword: 'Take care',
          description: 'Stay safe. Leave the rest to us!',
        },
        network_name: 'Ship This',
        network_url: this.configService.get(Configuration.FRONTEND_URL),
        bot_name: 'Ship This Bot',
        bot_url: this.configService.get(Configuration.BOT_URL),
      },
    };
  }

  invoice(buffer, email: string, fullName: string, trackingUrl: string) {
    return {
      to: email,
      from: this.configService.get(Configuration.SEND_GRID_EMAIL),
      templateId: this.configService.get(Configuration.SEND_GRID_TEMPLATE),
      dynamicTemplateData: {
        sender_name: 'Ship This',
        title: 'Shipment invoice',
        subject: 'Shipment invoice',
        announcement: {
          description: 'New Order',
        },
        thanks: 'Thank you for choosing us!',
        email_body: `${fullName}, thank you for choosing us! We attached your new shipment's invoice.`,
        column1: {
          keyword: 'Ship',
          description: "Anywhere in the US! It's quick and simple",
        },
        column2: {
          keyword: 'Track',
          description:
            "Your shipment's delivery process using our Telegram bot",
        },
        column3: {
          keyword: 'Take care',
          description: 'Stay safe. Leave the rest to us!',
        },
        network_name: 'Ship This Order',
        network_url: trackingUrl,
        bot_name: 'Ship This Bot',
        bot_url: this.configService.get(Configuration.BOT_URL),
      },
      attachments: [
        {
          filename: `ship_this_invoice.pdf`,
          type: 'pdf',
          content: buffer.toString('base64'),
        },
      ],
    };
  }

  discount(
    dis_name: string,
    percentage: number,
    user_name: string,
    user_last_name: string,
    email: string,
  ) {
    return {
      to: email,
      from: this.configService.get(Configuration.SEND_GRID_EMAIL),
      templateId: this.configService.get(Configuration.SEND_GRID_TEMPLATE),
      dynamicTemplateData: {
        sender_name: 'Ship This',
        title: 'We have assigned you a new discount!',
        subject: 'We have assigned you a new discount!',
        email_body: `${user_name} ${user_last_name}, we thank you for trusting us <br> You have been one of our best clients. <br> To celebrate that you keep choosing us, we will give you a discount!`,
        thanks: 'Thanks for prefer us',
        announcement: {
          description: `${dis_name} DISCOUNT`,
          resume: `-${percentage}%`,
        },
        column1: {
          keyword: 'Ship',
          description: "Anywhere in the US! It's quick and simple",
        },
        column2: {
          keyword: 'Track',
          description:
            "Your shipment's delivery process using our Telegram bot",
        },
        column3: {
          keyword: 'Take care',
          description: 'Stay safe. Leave the rest to us!',
        },
        network_name: 'Ship This',
        network_url: this.configService.get(Configuration.FRONTEND_URL),
        bot_name: 'Ship This Bot',
        bot_url: this.configService.get(Configuration.BOT_URL),
      },
    };
  }
}
