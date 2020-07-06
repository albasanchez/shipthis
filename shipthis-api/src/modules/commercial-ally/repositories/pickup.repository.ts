import { Repository, EntityRepository, In } from 'typeorm';
import { Pickup } from '../entities/pickup.entity';

@EntityRepository(Pickup)
export class PickupRepository extends Repository<Pickup> {

       getPickupsByWarehouse(id: number) : Promise<any> {
        return this.find({
         where: { origin_warehouse: id },
       });
       }

       getPickups() : Promise<any> {
        return this.find();
       }

       getCommercialAllyPickups(warehouses: number[]) : Promise<Pickup[]> {
              return this.find({ where: [{ origin_warehouse: In(warehouses) }] });
             }

}