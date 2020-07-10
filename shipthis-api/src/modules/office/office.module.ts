import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeReposiroty } from './repositories/office.repository';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeReposiroty]), AppLoggerModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
