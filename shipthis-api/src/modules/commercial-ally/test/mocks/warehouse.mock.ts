import { WarehouseStatus } from '../../constants/warehouse-status.enum';
import { defaultPlace, defaultWarehouse } from './constants';

export class WarehouseMock {
  findOne(successful: string) {
    defaultPlace.position_lat = -77.846;
    defaultPlace.position_long = 105.1123;
    defaultWarehouse.place = defaultPlace;
    if (successful == 'Active') {
      defaultWarehouse.status = WarehouseStatus.ACTIVE;
      return jest.fn().mockResolvedValue(defaultWarehouse);
    } else if (successful == 'Deleted') {
      defaultWarehouse.status = WarehouseStatus.DELETED;
      return jest.fn().mockResolvedValue(defaultWarehouse);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
  find() {
    defaultWarehouse.warehouse_id = 1;
    defaultWarehouse.name = 'Warehouse';
    defaultWarehouse.place = defaultPlace;
    defaultWarehouse.status = WarehouseStatus.ACTIVE;
    return jest.fn().mockResolvedValue([defaultWarehouse]);
  }
  save() {
    defaultWarehouse.warehouse_id = 1;
    defaultWarehouse.name = 'Warehouse';
    defaultWarehouse.place = defaultPlace;
    defaultWarehouse.status = WarehouseStatus.ACTIVE;
    return jest.fn().mockResolvedValue(defaultWarehouse);
  }
  update() {
    return jest.fn();
  }
}

export const warehouseCreateQueryBuilder: any = {
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  execute: jest.fn().mockReturnThis(),
};
