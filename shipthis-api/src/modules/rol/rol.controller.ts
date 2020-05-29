import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rols')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    return await this._rolService.get(id);
  }

  @Get()
  async getAllRols() {
    return await this._rolService.gelAll();
  }
}
