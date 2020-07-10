import { PickupStatus } from './../constants/pickup-status.enum';
import { Repository, EntityRepository, In, Not } from 'typeorm';
import { Pickup } from '../entities/pickup.entity';

@EntityRepository(Pickup)
export class PickupRepository extends Repository<Pickup> {
  getPickupsByWarehouse(id: number): Promise<any> {
    return this.find({
      where: { origin_warehouse: id },
    });
  }

  getPickups(): Promise<any> {
    return this.find();
  }

  getCommercialAllyPickups(warehouses: number[]): Promise<Pickup[]> {
    return this.find({ where: [{ origin_warehouse: In(warehouses) }] });
  }

  registerPickup(pickup: Pickup): Promise<Pickup> {
    return this.save(pickup);
  }

  async fetchPickup(track_id: string): Promise<Pickup> {
    return this.findOne(track_id);
  }

  async searchNotDeliveredPickups(): Promise<Pickup[]> {
    return await this.find({
      where: { status: Not(PickupStatus.DELIVERED) },
    });
  }

  async updatePickupStatus(
    pickup_id: number,
    newStatus: string,
    date: Date,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({ status: newStatus, delivery_date: date })
      .where({ pickup_id: pickup_id })
      .execute();
  }
}
