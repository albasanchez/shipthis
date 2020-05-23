import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeReposiroty } from './office.repository';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeReposiroty])],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
