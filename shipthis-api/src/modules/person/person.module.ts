import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { AppLoggerService } from 'src/log/applogger.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  exports:[],
  imports: [TypeOrmModule.forFeature([PersonRepository]), AppLoggerModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
