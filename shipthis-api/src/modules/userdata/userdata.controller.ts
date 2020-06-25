import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Patch} from '@nestjs/common';
import { UserdataService } from './userdata.service';
import { ReceiverInfoDto} from './dto/receiverInfo.dto';
import { CreateReceiverDto} from './dto/create-receiver.dto';
import { UpdateReceiverDto} from './dto/update-receiver.dto';

@Controller('userdata')
export class UserdataController {
    constructor(private readonly _userdataService: UserdataService) {}

    @Get('receivers/:id')
    async getReceivers(@Param('id', ParseIntPipe) id: number) {
    return await this._userdataService.getReceivers(id);
  }

    @Post ('create-receiver') 
    @UsePipes(ValidationPipe)
    async createReceiver (@Body() newReceiver: CreateReceiverDto): Promise<CreateReceiverDto> {
    return this._userdataService.createReceiver(newReceiver);
  }
    
    @Patch('update-receiver/:id') 
    @UsePipes(ValidationPipe)
    async updateReceiver (@Param('id', ParseIntPipe) id: number, @Body() newReceiver: UpdateReceiverDto): Promise<UpdateReceiverDto> {
      return this._userdataService.updateReceiver(id, newReceiver);
    }

    @Delete ('delete-receiver/:id')
    async deleteReceiver(@Param('id', ParseIntPipe) id: number) {
      return await this._userdataService.deleteReceiver(id);
    }

}
