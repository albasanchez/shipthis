import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { SimulationService } from '../../simulation.service';
import { SimulationRepository } from '../../repositories/simulation.repository';

import { PickupRepository } from '../../../../modules/commercial-ally/repositories/pickup.repository';
import { CheckPointRepository } from '../../../../modules/ordersheet/repositories/check-point.repository';
import { OrdersheetRepository } from '../../../../modules/ordersheet/repositories/ordersheet.repository';
import {  SchedulerRegistry} from '@nestjs/schedule'

export const simulationMockModuleMetadata: ModuleMetadata = {
  providers: [SimulationService, SimulationRepository, PickupRepository, CheckPointRepository, OrdersheetRepository, SchedulerRegistry],
  imports: [AppLoggerModule],
};

export class SimulationMock {
  save() {
    return jest.fn();
  }
  update() {
    return jest.fn();
  }
  
  getExecutionTime() {
    return jest.fn();
  }
  findOne() {
    return jest.fn().mockResolvedValue({
      simulation_id: 1,
      starting_date: new Date(),
      ending_date: new Date(),
      config_time: 1,
    });
  }
}
