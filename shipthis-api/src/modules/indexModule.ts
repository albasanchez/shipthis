import { InternationalizationModule } from './internationalization/internationalization.module';
import { DiscountModule } from './discount/discount.module';
import { CommercialAllyModule } from './commercial-ally/commercial-ally.module';
import { SimulationModule } from './simulation/simulation.module';
import { CommentBoxModule } from './comment-box/comment-box.module';
import { ItemTypeModule } from './item-type/item-type.module';
import { OfficeModule } from './office/office.module';
import { OrderTypeModule } from './order-type/order-type.module';
import { OrdersheetModule } from './ordersheet/ordersheet.module';
import { RolModule } from './rol/rol.module';
import { UserdataModule } from './userdata/userdata.module';
import { AuthModule } from './auth/auth.module';
import { TelegramModule } from './telegram/telegram.module';
import { EmailModule } from './email/email.module';

export const indexModules = [
  AuthModule,
  CommentBoxModule,
  CommercialAllyModule,
  DiscountModule,
  ItemTypeModule,
  OfficeModule,
  OrderTypeModule,
  OrdersheetModule,
  RolModule,
  SimulationModule,
  TelegramModule,
  UserdataModule,
  EmailModule,
  InternationalizationModule,
];
