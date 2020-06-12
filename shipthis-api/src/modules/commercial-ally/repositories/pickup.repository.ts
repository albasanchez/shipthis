import { Repository, EntityRepository } from 'typeorm';
import { Pickup } from '../entities/pickup.entity';

@EntityRepository(Pickup)
export class PickupRepository extends Repository<Pickup> {}