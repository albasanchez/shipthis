import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/dao/database/database.module';
import { objectRepository } from '../dao/repository.providers';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...objectRepository],
})
export class AppModule {
}
