import { Repository, EntityRepository } from 'typeorm';
import { Userdata } from './userdata.entity';

@EntityRepository(Userdata)
export class UserdataRepository extends Repository<Userdata> {}
