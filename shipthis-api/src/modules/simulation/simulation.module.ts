import { SimulationRepository } from './repositories/simulation.repository';
import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { AppLoggerModule } from 'src/log/applogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationController } from './simulation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SimulationRepository]), AppLoggerModule],
  providers: [SimulationService],
  controllers: [SimulationController],
})
export class SimulationModule {}
