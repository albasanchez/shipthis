import { Repository, EntityRepository } from 'typeorm';
import { Office } from './office.entity';

@EntityRepository(Office)
export class OfficeReposiroty extends Repository<Office> {}
