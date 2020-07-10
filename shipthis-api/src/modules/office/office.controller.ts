import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { OfficeService } from './office.service';

@UseGuards(AuthGuard('jwt'))
@Controller('office')
export class OfficeController {
  constructor(private readonly _officeService: OfficeService) {}

  @Get('allActive')
  async getAllActiveOffices() {
    return this._officeService.getAllActiveOffices();
  }
}
