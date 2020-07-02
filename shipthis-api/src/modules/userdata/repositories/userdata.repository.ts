import { Repository, EntityRepository } from 'typeorm';
import { Userdata } from '../entities/userdata.entity';
import { UserdataStatus } from '../constants/user-status.enum';

@EntityRepository(Userdata)
export class UserDataRepository extends Repository<Userdata> {
  async getUser(id: number): Promise<Userdata> {
    return this.findOne({ user_id: id });
  }

  async fetchUser(useremail: string): Promise<Userdata> {
    return this.findOne({
      where: { email: useremail, status: UserdataStatus.ACTIVE },
    });
  }

  async getAllUsers(): Promise<Userdata[]> {
    return this.find();
  }
}
