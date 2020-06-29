import { Repository, EntityRepository } from 'typeorm';
import { Userdata } from '../entities/userdata.entity';

@EntityRepository(Userdata)
export class UserDataRepository extends Repository<Userdata> {

   async getUser(id: number): Promise<Userdata> {
        return this.findOne({ user_id: id });
      }

   async getAllUsers(): Promise<Userdata[]> {
        return this.find();
      }

}
