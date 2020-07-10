import { Rol } from './../../rol/entities/rol.entity';
import { Person } from './../../userdata/entities/person.entity';
import { RolNotFoundException } from './../../../common/exceptions/rol-not-found.exception';
import { UserdataRegistrationType } from './../../userdata/constants/user-registration.enum';
import { UserdataStatus } from './../../userdata/constants/user-status.enum';
import { Userdata } from './../../userdata/entities/userdata.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
import { SignupDto } from '../dto';

@EntityRepository(Userdata)
export class AuthRepository extends Repository<Userdata> {
  async signup(
    signupDto: SignupDto,
    reg_type: string,
    rol_name: string,
  ): Promise<Userdata> {
    const { useremail, password, date_of_birth, ...detail } = signupDto;

    //Creating Userdata structure
    const user = new Userdata();
    user.email = useremail;
    user.registration_type = reg_type;
    user.registration_date = new Date();
    user.status = UserdataStatus.ACTIVE;

    //hashing password
    if (reg_type === UserdataRegistrationType.REGULAR) {
      const salt = await genSalt(10);
      user.password = await hash(password, salt);
    } else {
      user.password = '';
    }
    //searching for role
    const rolRepository = await getConnection().getRepository(Rol);
    const defaulRol = await rolRepository.findOne({
      where: { name: rol_name },
    });
    if (!defaulRol) {
      throw new RolNotFoundException();
    }
    //assigning role to user
    user.rol = defaulRol;
    //creating person structure
    const profile: Person = (detail as unknown) as Person;

    try {
      profile.date_of_birth = new Date();
    } catch (error) {}
    //assigning person profile to user
    user.person = profile;
    //saving user on DB
    return this.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: Userdata = await this.findOne({ where: { email: email } });
    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  async fetchUser(email: string): Promise<Userdata> {
    return this.findOne({ where: { email: email } });
  }

  async fetchRegularUser(email: string): Promise<Userdata> {
    return this.findOne({
      where: {
        email: email,
        registration_type: UserdataRegistrationType.REGULAR,
      },
    });
  }

  async recoverUSer(useremail: string, password: string) {
    const salt = await genSalt(10);
    const salted_password = await hash(password, salt);
    this.createQueryBuilder()
      .update()
      .set({ password: salted_password })
      .where('email = :email', { email: useremail })
      .execute();
  }
}
