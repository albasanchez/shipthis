import { Repository, EntityRepository, In } from 'typeorm';
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
      select: ['user_id', 'email', 'status'],
      where: { user_id: id, status: UserdataStatus.ACTIVE },
      relations: ['person'],
    });
  }

  async getUserActiveOrBloked(id: number): Promise<Userdata> {
    return this.findOne({
      where: [
        { user_id: id, status: UserdataStatus.ACTIVE },
        { user_id: id, status: UserdataStatus.BLOCKED },
      ],
    });
  }

  async modifyUserStatus(user: Userdata, new_status: UserdataStatus) {
    user.status = new_status;
    this.save(user);
  }

  async getUsers(users_id: number[]): Promise<Userdata[]> {
    return this.find({ where: [{ user_id: In(users_id) }] });
  }

  async getUsersWithMoreOrders(): Promise<any[]> {
    return this.query(
      `
    select o.user_fk as user_id,
    count(*) as cantidad 
    from ordersheet o, userdata u
    where u.user_id=o.user_fk
    group by user_fk
    order by cantidad desc
    limit 20;
    `.trim(),
    );
  }

  async getUsersWithLessOrders(): Promise<any[]> {
    return this.query(
      `
    select o.user_fk as user_id,
    count(*) as cantidad 
    from ordersheet o, userdata u
    where u.user_id=o.user_fk
    group by user_fk
    order by cantidad asc
    limit 20;
    `.trim(),
    );
  }

  async getLatestUsers(): Promise<Userdata[]> {
    return this.createQueryBuilder('user')
      .orderBy('user.registration_date', 'DESC')
      .limit(50)
      .getMany();
  }
}
