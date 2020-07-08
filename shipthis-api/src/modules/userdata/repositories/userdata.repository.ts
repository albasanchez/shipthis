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

  async getUserWithPerson(id: number): Promise<Userdata> {
    return this.findOne({
      select: ['user_id','email','status'],
      where: { user_id: id, status: UserdataStatus.ACTIVE },
      relations: ['person']
    })
  }

  async getUserActiveOrBloked(id: number): Promise<Userdata> {
    return this.findOne({
      where: [
        { user_id: id, status: UserdataStatus.ACTIVE },
        { user_id: id, status: UserdataStatus.BLOCKED },
      ]
    })
  }

  async modifyUserStatus(user: Userdata, new_status: UserdataStatus){
    user.status = new_status;
    this.save(user);
  }
}
