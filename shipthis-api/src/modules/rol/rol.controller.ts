import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RolService } from './rol.service';

@UseGuards(AuthGuard('jwt'))
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
