import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataRepository } from './userdata.repository';
import { UserdataController } from './userdata.controller';
import { UserdataService } from './userdata.service';

@Module({
  
  imports: [TypeOrmModule.forFeature([UserDataRepository])],
  controllers: [UserdataController],
  providers: [UserdataService],
})
export class UserdataModule {}
