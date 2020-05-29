import { Controller, Get } from '@nestjs/common';
import { OfficeService } from './office.service';

@Controller('office')
export class OfficeController {
  constructor(private readonly _officeService: OfficeService) {}

  @Get('allActive')
  async getAllActiveOffices() {
    return this._officeService.getAllActiveOffices();
  }
}
