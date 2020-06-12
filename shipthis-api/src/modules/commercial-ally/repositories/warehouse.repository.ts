import { Repository, EntityRepository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {}