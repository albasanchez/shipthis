import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Userdata } from '../userdata/userdata.entity';
import { SignupDto } from './dto';
import { Rol } from '../rol/rol.entity';
import { UserdataStatus } from '../userdata/constants/user-status.enum';
import { RolNotFoundException } from '../../common/exceptions/rol-not-found.exception';
import { Person } from '../person/person.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { UserdataRegistrationType } from '../userdata/constants/user-registration.enum';
import { emit } from 'cluster';

@EntityRepository(Userdata)
export class AuthRepository extends Repository<Userdata> {
  async signup(
    signupDto: SignupDto,
    reg_type: string,
    rol_name: string,
  ): Promise<Userdata> {
    const {
      useremail,
      username,
      password,
      date_of_birth,
      ...detail
    } = signupDto;
  
    //Creating Userdata structure
    const user = new Userdata();
    user.email = useremail;
    user.username = username;
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
    const profile: Person = detail as Person;

    try {
      profile.date_of_birth = new Date();
    } catch (error) {
     
    }
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
}
