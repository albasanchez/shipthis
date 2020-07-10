import { WarehouseInfoDto } from '../modules/commercial-ally/dto/warehouse-info.dto';
import { WarehousesInfoDto } from '../modules/commercial-ally/dto/warehouses-info.dto';
import { Warehouse } from '../modules/commercial-ally/entities/warehouse.entity';
import { CommercialAlly } from '../modules/commercial-ally/entities/commercial-ally.entity';

export class MapperWarehouse {

    static warehouseToWarehouseInfo(warehouse: Warehouse, commercial_ally_key: string): WarehouseInfoDto{

        const warehouseInfo: WarehouseInfoDto = {
              name : warehouse.name,
              commercial_ally_key: commercial_ally_key,
              address: warehouse.place.address
        };

        return warehouseInfo;
    }

    static warehouseToWarehousesInfo(warehouse: Warehouse): WarehousesInfoDto{

        const warehouseInfo: WarehousesInfoDto = {
              id: warehouse.warehouse_id,
              name : warehouse.name,
              place: warehouse.place,
              status: warehouse.status
        };

        return warehouseInfo;
    }

    static warehouseToWarehouseBasicInfo(warehouse: Warehouse){

        const warehouseInfo = {
              warehouse_id: warehouse.warehouse_id,
              name : warehouse.name,
              place: warehouse.place,
              status : warehouse.status
        };

        return warehouseInfo;
    }

}