import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataRepository } from './repositories/userdata.repository';
import { UserdataController } from './userdata.controller';
import { UserdataService } from './userdata.service';
import { PersonRepository } from './repositories/person.repository';
import { ReceiverRepository } from './repositories/receiver.repository';
import { AppLoggerModule } from '../../log/applogger.module';
import { PersonSubscriber } from './subscribers/person-subscriber.service';
import { EncriptionModule } from '../encription/encription.module';
import { UserdataSubscriber } from './subscribers/userdata-subscriber.service';
import { ReceiverSubscriber } from './subscribers/receiver-subscriber.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDataRepository]),
    TypeOrmModule.forFeature([PersonRepository]),
    TypeOrmModule.forFeature([ReceiverRepository]),
    AppLoggerModule,
    EncriptionModule,
  ],
  controllers: [UserdataController],
  providers: [
    UserdataService,
    UserdataSubscriber,
    PersonSubscriber,
    ReceiverSubscriber,
  ],
})
export class UserdataModule {}
