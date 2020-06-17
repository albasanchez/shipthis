import { Controller,Get,Param,ParseIntPipe } from '@nestjs/common';
import { UserdataService } from './userdata.service';

@Controller('userdata')
export class UserdataController {
    constructor(private readonly _userdataService: UserdataService) {}

    @Get('receivers/:id')
    async getReceivers(@Param('id', ParseIntPipe) id: number) {
    return await this._userdataService.getReceivers(id);
  }

}
