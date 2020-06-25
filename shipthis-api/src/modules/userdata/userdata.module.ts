import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataRepository } from './repositories/userdata.repository';
import { UserdataController } from './userdata.controller';
import { UserdataService } from './userdata.service';
import { PersonRepository } from './repositories/person.repository';
import { ReceiverRepository } from './repositories/receiver.repository';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDataRepository]),
    TypeOrmModule.forFeature([PersonRepository]),
    TypeOrmModule.forFeature([ReceiverRepository]),
    AppLoggerModule,
  ],
  controllers: [UserdataController],
  providers: [UserdataService],
})
export class UserdataModule {}
