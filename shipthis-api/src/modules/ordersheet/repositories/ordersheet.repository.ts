import { Repository, EntityRepository } from 'typeorm';
import { Ordersheet } from '../entities/ordersheet.entity';

@EntityRepository(Ordersheet)
export class OrdersheetRepository extends Repository<Ordersheet> {}
