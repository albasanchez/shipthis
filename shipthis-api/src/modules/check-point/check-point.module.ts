import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckPointRepository } from './check-point.repository';
import { CheckPointController } from './check-point.controller';
import { CheckPointService } from './check-point.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckPointRepository])],
  controllers: [CheckPointController],
  providers: [CheckPointService],
})
export class CheckPointModule {}
