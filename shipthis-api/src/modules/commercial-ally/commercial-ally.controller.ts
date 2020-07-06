import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Patch, Param, ParseIntPipe, Delete} from '@nestjs/common';
import { CommercialAllyInfoDto } from './dto/commercial-ally-info.dto';
import { NewCommercialAllyDto } from './dto/new-commercial-ally.dto';
import { CommercialAllyService } from './commercial-ally.service';
import { UpdateCommercialAllyDto } from './dto/update-commercial-ally.dto';
import { WarehouseInfoDto} from './dto/warehouse-info.dto';
import { CommercialAllyKeyDto } from './dto/commercial-ally-key.dto'
import { UpdateWarehouseDto } from './dto/update-warehouse.dto'

@Controller('commercial-ally')
export class CommercialAllyController {

    constructor(private readonly _commercialAllyServ: CommercialAllyService) {}

    @Post ('create-commercial-ally') 
    @UsePipes(ValidationPipe)
    async createCommercialAlly (@Body() newCommercialAlly: NewCommercialAllyDto): Promise<NewCommercialAllyDto> {
    return this._commercialAllyServ.createCommercialAlly(newCommercialAlly);
    }

    @Get('commercial-allies')
    async getAllCommercialAllies() {
      return await this._commercialAllyServ.getAllCommercialAllies();
    }

    @Post ('update-commercial-ally') 
    @UsePipes(ValidationPipe)
    async updateCommercialAlly (@Body() newCommercialAlly: UpdateCommercialAllyDto) {
    return this._commercialAllyServ.updateCommercialAlly(newCommercialAlly);
    }

    @Post ('delete-commercial-ally') 
    @UsePipes(ValidationPipe)
    async deleteCommercialAlly (@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.deleteCommercialAlly(commercialAllykey.commercial_ally_key);
    }

    @Post ('commercial-ally-warehouses') 
    @UsePipes(ValidationPipe)
    async getWarehouses (@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.getWarehouses(commercialAllykey.commercial_ally_key);
    }

    @Post ('create-warehouse') 
    @UsePipes(ValidationPipe)
    async createWarehouse (@Body() newWarehouse): Promise<WarehouseInfoDto> {
    return this._commercialAllyServ.createWarehouse(newWarehouse);
    }

    @Post('commercial-ally-pickups') 
    @UsePipes(ValidationPipe)
    async getPickups (@Body() commercialAllykey: CommercialAllyKeyDto) {
    return this._commercialAllyServ.getPickups(commercialAllykey.commercial_ally_key);
    }

    @Patch('update-warehouse/:id') 
    @UsePipes(ValidationPipe)
    async updateWarehouse (@Param('id', ParseIntPipe) id: number, @Body() newWarehouse: UpdateWarehouseDto): Promise<UpdateWarehouseDto> {
      return this._commercialAllyServ.updateWarehouse(id, newWarehouse);
    }

    @Delete ('delete-warehouse/:id')
    async deleteWarehouse(@Param('id', ParseIntPipe) id: number) {
      return await this._commercialAllyServ.deleteWarehouse(id);
    }

}
