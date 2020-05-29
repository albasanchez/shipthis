import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrajectoryController } from './trajectory.controller';
import { TrajectoryService } from './trajectory.service';
import { TrajectoryRepository } from './trajectory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrajectoryRepository])],
  controllers: [TrajectoryController],
  providers: [TrajectoryService],
})
export class TrajectoryModule {}
