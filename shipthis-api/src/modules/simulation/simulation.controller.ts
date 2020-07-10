import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { NewConfigTimeDto } from './dto/new-config-time.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('simulation')
export class SimulationController {
  constructor(private readonly _simulationServ: SimulationService) {}

  @Get('current-config-time')
  async getCurrentConfigtime() {
    return this._simulationServ.getCurrentConfigTime();
  }

  @Post('update-config-time')
  @UsePipes(ValidationPipe)
  async updateItemHist(
    @Body() newRegister: NewConfigTimeDto,
  ): Promise<NewConfigTimeDto> {
    return this._simulationServ.updateConfigTime(newRegister);
  }
}
