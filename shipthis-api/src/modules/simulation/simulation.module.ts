import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [AppLoggerModule],
  providers: [SimulationService],
})
export class SimulationModule {}
