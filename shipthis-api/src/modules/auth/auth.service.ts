import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto } from './dto';
import { UserdataRegistrationType } from '../userdata/constants/user-registration.enum';
import { RolName } from '../rol/constants/rol-name.enum';
import { IJwtPayload } from './payloads/jwt-payload.interace';
import { Userdata } from '../userdata/userdata.entity';
import { GenderType } from '../person/constants/gender.enum';
import { AppLoggerService } from 'src/log/applogger.service';
import { UserAlreadyRegisteredException } from 'src/common/exceptions/user-already-registered.exception';
import { WrongCredentialsException } from 'src/common/exceptions/wrong-credentials.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async googleLogin(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log(
      'GoogleLogin: User trying to authenticate using federated login with google',
    );
    //validating email no registeres
    const { useremail } = signup;

    const posibleUser = await this._authRepository.findOne({
      where: { email: useremail },
    });

    let user: Userdata;

    if (!posibleUser) {
      this._appLogger.log('Registering new user. Registration type : GOOGLE');
      user = await this._authRepository.signup(
        signup,
        UserdataRegistrationType.GOOGLE,
        RolName.CLIENT,
      );
    } else {
      user = posibleUser;
    }

    return this.returnUser(user);
  }

  async regularSignup(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log(
      'No federated registration: User trying to sign up with form registration',
    );
    //validating email no registeres
    const { useremail } = signup;

    const posibleUser = await this._authRepository.findOne({
      where: { email: useremail },
    });

    let user: Userdata;

    if (posibleUser) {
      this._appLogger.log('Registered email trying to register again');
      throw new UserAlreadyRegisteredException();
    }

    this._appLogger.log('Registering new user. Registration type : REGULAR');
    user = await this._authRepository.signup(
      signup,
      UserdataRegistrationType.REGULAR,
      RolName.CLIENT,
    );

    this._appLogger.log('NEW USER regitered successfully');
    return this.returnUser(user);
  }

  async regularLogin(
    logindata: LoginDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('No federated Login: user logging in');
    //validating email no registeres
    const { useremail, password: pwd } = logindata;

    const user: Userdata = await this._authRepository.findOne({
      where: { email: useremail },
    });

    if (!user) {
      this._appLogger.log('User not found');
      throw new UserNotFoundException();
    }

    const isMatch = await compare(pwd, user.password);

    if (!isMatch) {
      this._appLogger.log('Wrong credentias provided');
      throw new WrongCredentialsException();
    }

    this._appLogger.log('User logged in successfully');
    return this.returnUser(user);
  }

  async returnUser(user: Userdata): Promise<{ token: string; userdata: any }> {
    const payload: IJwtPayload = {
      id: user.user_id,
      email: user.email,
      username: user.username,
      rol: user.rol.name as RolName,
    };
    const token = await this._jwtService.sign(payload);
    const { password, ...userdata } = user;
    return { token, userdata };
  }

  generateSignuoDtoFromGoogle(googleData: any): SignupDto {
    const signup: SignupDto = new SignupDto();
    signup.useremail = googleData.email;
    signup.first_name = googleData.firstName;
    signup.last_name = googleData.lastName;
    signup.picture_url = googleData.picture;
    signup.def_language = googleData.language;
    signup.gender = GenderType.OTHER;
    signup.receive_notifications = true;
    return signup;
  }
}
