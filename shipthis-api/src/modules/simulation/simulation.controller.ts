import { Controller, Get, Patch, UsePipes, ValidationPipe, Body, Post} from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { NewRegisterDto } from './dto/NewRegister.dto';

@Controller('simulation')
export class SimulationController {
    constructor(private readonly _simulationServ: SimulationService) {}

    @Get('current-config-time')
    async getCurrentConfigtime() {
    return this._simulationServ.getCurrentConfigTime();
  }

  @Post ('update-config-time') 
  @UsePipes(ValidationPipe)
  async updateItemHist (@Body() NewRegister: NewRegisterDto): Promise<NewRegisterDto> {
  return this._simulationServ.updateConfigTime(NewRegister);
  }
}
