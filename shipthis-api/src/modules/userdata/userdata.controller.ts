import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserdataService } from './userdata.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { ModifyPasswordDTO } from './dto/modify-password.dto';
import { UpdateUserDataDTO } from './dto/update-userdata.dto';
import { UpdateUserStatusDTO } from './dto/update-user-status.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('userdata')
export class UserdataController {
  constructor(private readonly _userdataService: UserdataService) {}

  @Get('receivers/:id')
  async getReceivers(@Param('id', ParseIntPipe) id: number) {
    return await this._userdataService.getReceivers(id);
  }

  @Post('create-receiver')
  @UsePipes(ValidationPipe)
  async createReceiver(
    @Body() newReceiver: CreateReceiverDto,
  ): Promise<CreateReceiverDto> {
    return this._userdataService.createReceiver(newReceiver);
  }

  @Patch('update-receiver/:id')
  @UsePipes(ValidationPipe)
  async updateReceiver(
    @Param('id', ParseIntPipe) id: number,
    @Body() newReceiver: UpdateReceiverDto,
  ): Promise<UpdateReceiverDto> {
    return this._userdataService.updateReceiver(id, newReceiver);
  }

  @Delete('delete-receiver/:id')
  async deleteReceiver(@Param('id', ParseIntPipe) id: number) {
    return await this._userdataService.deleteReceiver(id);
  }

  @Get('users')
  async getAllUsersInfo() {
    return await this._userdataService.getAllUsersInfo();
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this._userdataService.deleteUser(id);
  }

  @Patch('users/password')
  async modifyPassword(@Body() info: ModifyPasswordDTO) {
    return await this._userdataService.modifyPassword(info);
  }

  @Patch('users/data')
  async modifyInfo(@Body() info: UpdateUserDataDTO) {
    return await this._userdataService.modifyUserdata(info);
  }

  @Patch('users/status')
  async updateStatus(@Body() info: UpdateUserStatusDTO) {
    return await this._userdataService.changeUserStatus(
      info.user_id,
      info.status,
    );
  }
}
