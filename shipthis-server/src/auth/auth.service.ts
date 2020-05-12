
import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';
import { UserData } from 'src/dao/entity/user_data.entity';
import { Person } from 'src/dao/entity/person.entity';
import { Rol } from 'src/dao/entity/rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof  UserData,
    @Inject('PERSON_REPOSITORY') private personRepository: typeof Person,
    @Inject('ROL_REPOSITORY') private rolRepository: typeof Rol,  
    private jwtService: JwtService
  ) {}


  async generateToken(user: any) {
    const userData = await this.getOneUser(user.email);
    const person = await this.getOnePerson(userData.user_id);
    const nameRol = await this.getNameRol(userData.rol_id_fk);
    
    return {
            access_token: this.jwtService.sign({userId:userData.user_id, rolId: userData.rol_id_fk,
            personId:person.person_id, picture:person.profile_picture}),
    };
  }

  async getOnePerson(userId){
    const person = await this.personRepository.findOne<Person>({
        where:{
            user_fk:userId
        }
    }).then(person=>{return person});
    return person;
  }

  async getOneUser(email){
    const user = await this.userRepository.findOne<UserData>({
        where:{
            user_email:email
        }
    }).then(user=>{return user});
    return user;
  }

  async getNameRol(rolId){
    const nameRol = await this.rolRepository.findOne<Rol>({
        where:{
            rol_id:rolId
        }
    }).then(rol=>{return rol.rol_name})
    return nameRol;
  }
}