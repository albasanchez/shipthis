import { DiscPer } from './../entities/disc-per.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(DiscPer)
export class DiscPerRepository extends Repository<DiscPer> {}
