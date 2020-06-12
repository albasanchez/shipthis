import { Repository, EntityRepository } from 'typeorm';
import { Userdata } from '../entities/userdata.entity';

@EntityRepository(Userdata)
export class UserDataRepository extends Repository<Userdata> {}
