import { Injectable, Inject } from '@nestjs/common';
import { UserData } from 'src/dao/entity/user_data.entity';
import { Person } from 'src/dao/entity/person.entity';
import { Rol } from 'src/dao/entity/rol.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleService {
  
  constructor( 
    @Inject('USER_REPOSITORY') private userRepository: typeof  UserData,
    @Inject('PERSON_REPOSITORY') private personRepository: typeof Person,
    @Inject('ROL_REPOSITORY') private rolRepository: typeof Rol,
    private authService:AuthService
  ) {}
  
  public date:Date = new Date();
  public user_id;
  public person_id;
  public rol_id;

  googleLogin(req) {
    this.getOneIdRol('Client');
    return this.getOneUsers(req.email).then(user=>{
      if(!user){ 
        this.createPerson(req)
        return this.authService.generateToken(req);
      } 
      if(user){
        return this.authService.generateToken(req)
      };
    })
    
  }

  async getOneUsers(email): Promise<UserData> { 
    return await this.userRepository.findOne<UserData>({where:{
     user_email: email
    }});
 } 

  getOneIdRol(nameRol){
    this.rolRepository.findOne<Rol>({
      where:{
        rol_name: nameRol
    }}).then(rol=>{this.rol_id = rol.rol_id});
  }

  createPerson(req){
    this.createUserData(req).then(i=>{
      Person.build(this.setPerson(req, i.user_id)).save();
    })
    return 'Registrado satifactoriamente'
  }

  createUserData(user){
    return UserData.build(this.setUser(user)).save();
  }

  setUser(req){
    return {
      user_email:req.email,
      user_status:'Activo',
      user_password: '',
      rol_id_fk: this.rol_id,
      createdAt:'',
    }
  }

  setPerson(user, id){
    return {
      first_name:user.firstName,
      middle_name:'',
      last_name:user.lastName,
      second_last_nam:'',
      phone_code:0,
      phone_number:0,
      date_of_birth:this.date,
      current_conn_date:this.date,
      previous_conn_date:this.date,
      def_language:'',
      profile_picture:user.picture,
      receive_notifications:true,
      user_fk:id
    }
  }

 } 
