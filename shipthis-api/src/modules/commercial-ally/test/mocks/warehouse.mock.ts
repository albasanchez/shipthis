import { WarehouseStatus } from '../../constants/warehouse-status.enum';
import { Warehouse } from '../../entities/warehouse.entity';
import { Place } from '../../../../modules/ordersheet/entities/place.entity';

const warehouse = new Warehouse();

const place = new Place();

export class WarehouseMock {
  findOne(successful: string) {
    place.position_lat = -77.846;
    place.position_long = 105.1123;
    warehouse.place = place;
    if (successful == 'Active') {
      warehouse.status = WarehouseStatus.ACTIVE;
      return jest.fn().mockResolvedValue(warehouse);
    } else if (successful == 'Deleted') {
      warehouse.status = WarehouseStatus.DELETED;
      return jest.fn().mockResolvedValue(warehouse);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
}
