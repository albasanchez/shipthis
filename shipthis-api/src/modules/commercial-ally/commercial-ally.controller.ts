import { AuthGuard } from '@nestjs/passport';
import { ConsultPickupDto } from './dto/consult-pickup.dto';
import { CreatePickupDto } from './dto/create-pickup.dto';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NewCommercialAllyDto } from './dto/new-commercial-ally.dto';
import { CommercialAllyService } from './commercial-ally.service';
import { UpdateCommercialAllyDto } from './dto/update-commercial-ally.dto';
import { WarehouseInfoDto } from './dto/warehouse-info.dto';
import { CommercialAllyKeyDto } from './dto/commercial-ally-key.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Response } from 'express';

@Controller('commercial-ally')
export class CommercialAllyController {
  constructor(private readonly _commercialAllyServ: CommercialAllyService) {}

  @Post('calculate-pickup')
  @UsePipes(ValidationPipe)
  async calculatePickup(@Body() pickup: CreatePickupDto) {
    return this._commercialAllyServ.calculatePickup(pickup);
  }

  @Post('create-pickup')
  @UsePipes(ValidationPipe)
  async createPickup(@Body() pickup: CreatePickupDto, @Res() res: Response) {
    return this._commercialAllyServ.registerPickup(pickup, res);
  }

  @Post('consult-pickup')
  @UsePipes(ValidationPipe)
  async consultPickup(@Body() pickup: ConsultPickupDto) {
    return this._commercialAllyServ.searchPickupDetail(pickup.tracking_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-commercial-ally')
  @UsePipes(ValidationPipe)
  async createCommercialAlly(
    @Body() newCommercialAlly: NewCommercialAllyDto,
  ): Promise<NewCommercialAllyDto> {
    return this._commercialAllyServ.createCommercialAlly(newCommercialAlly);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('commercial-allies')
  async getAllCommercialAllies() {
    return await this._commercialAllyServ.getAllCommercialAllies();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update-commercial-ally')
  @UsePipes(ValidationPipe)
  async updateCommercialAlly(
    @Body() newCommercialAlly: UpdateCommercialAllyDto,
  ) {
    return this._commercialAllyServ.updateCommercialAlly(newCommercialAlly);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete-commercial-ally')
  @UsePipes(ValidationPipe)
  async deleteCommercialAlly(@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.deleteCommercialAlly(
      commercialAllykey.commercial_ally_key,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('commercial-ally-warehouses')
  @UsePipes(ValidationPipe)
  async getWarehouses(@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.getWarehouses(
      commercialAllykey.commercial_ally_key,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-warehouse')
  @UsePipes(ValidationPipe)
  async createWarehouse(@Body() newWarehouse): Promise<WarehouseInfoDto> {
    return this._commercialAllyServ.createWarehouse(newWarehouse);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('commercial-ally-pickups')
  @UsePipes(ValidationPipe)
  async getPickups(@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.getPickups(
      commercialAllykey.commercial_ally_key,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-warehouse/:id')
  @UsePipes(ValidationPipe)
  async updateWarehouse(
    @Param('id', ParseIntPipe) id: number,
    @Body() newWarehouse: UpdateWarehouseDto,
  ): Promise<UpdateWarehouseDto> {
    return this._commercialAllyServ.updateWarehouse(id, newWarehouse);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-warehouse/:id')
  async deleteWarehouse(@Param('id', ParseIntPipe) id: number) {
    return await this._commercialAllyServ.deleteWarehouse(id);
  }
}
