import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdataRepository } from './userdata.repository';
import { UserdataController } from './userdata.controller';
import { UserdataService } from './userdata.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserdataRepository])],
  controllers: [UserdataController],
  providers: [UserdataService],
})
export class UserdataModule {}
