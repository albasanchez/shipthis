import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Userdata } from './userdata.entity';

@EntityRepository(Userdata)
export class UserDataRepository extends Repository<Userdata> {

  
}
