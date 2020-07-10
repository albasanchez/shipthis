import { Repository, EntityRepository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { WarehouseInfoDto } from '../dto/warehouse-info.dto';
import { CommercialAlly } from '../entities/commercial-ally.entity';
import { Place } from '../../ordersheet/entities/place.entity';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WarehouseStatus } from '../constants/warehouse-status.enum';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {
  async createWarehouses(
    newWarehouse: WarehouseInfoDto,
    commercialAlly: CommercialAlly,
    place: Place,
  ): Promise<any> {
    const warehouse: Warehouse = new Warehouse();

    warehouse.name = newWarehouse.name;
    warehouse.commercial_ally = commercialAlly;
    warehouse.status = WarehouseStatus.ACTIVE;
    warehouse.place = place;

    return this.save(warehouse);
  }

  async getWarehousesByCommercialAlly(key: string): Promise<any> {
    return this.find({
      where: { commercial_ally: key },
    });
  }

  async getWarehouseById(id: number): Promise<any> {
    return this.findOne({
      where: { warehouse_id: id },
    });
  }

  async getWarehouseFromAlly(
    id: number,
    commercial_ally: CommercialAlly,
  ): Promise<Warehouse> {
    return this.findOne({
      where: { warehouse_id: id, commercial_ally: commercial_ally },
    });
  }

  async updateWarehouse(
    id: number,
    newWarehouse: UpdateWarehouseDto,
  ): Promise<any> {
    if (!newWarehouse.place) {
      const warehouse = {
        name: newWarehouse.name,
      };
      this.update(id, warehouse);
    } else {
      const warehouse = {
        name: newWarehouse.name,
        place: newWarehouse.place,
      };
      this.update(id, warehouse);
    }
    return { response: 'Warehouse has been updated sucessfully' };
  }

  async deleteWarehouse(id: number): Promise<any> {
    this.update(id, { status: WarehouseStatus.DELETED });

    return { response: 'Warehouse has been deleted sucessfully' };
  }

  async deleteWarehouses(commercial_ally_key: string): Promise<any> {
    this.createQueryBuilder()
      .update()
      .set({ status: WarehouseStatus.DELETED })
      .where('commercial_ally_fk = :key', { key: commercial_ally_key })
      .execute();

    return { response: 'Warehouses has been deleted sucessfully' };
  }
}
