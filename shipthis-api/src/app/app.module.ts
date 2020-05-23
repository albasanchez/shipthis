import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from 'src/config/config.keys';

import { DatabaseModule } from 'src/database/database.module';
import { indexModules } from 'src/modules/indexModule';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [...indexModules, ConfigModule, DatabaseModule],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
