import { Repository, EntityRepository } from 'typeorm';
import { Ordersheet } from './ordersheet.entity';

@EntityRepository(Ordersheet)
export class OrdersheetRepository extends Repository<Ordersheet> {}
