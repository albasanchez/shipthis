import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rols')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get(':id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    console.log('Buscando uno con id: ' + id);
    return await this._rolService.get(id);
  }

  @Get()
  async getAllRols() {
    console.log('Buscando todos');
    return await this._rolService.gelAll();
  }
}
