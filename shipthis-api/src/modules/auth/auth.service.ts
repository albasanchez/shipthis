import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto, RecoverUserDto } from './dto';
import { UserdataRegistrationType } from '../userdata/constants/user-registration.enum';
import { RolName } from '../rol/constants/rol-name.enum';
import { IJwtPayload } from './payloads/jwt-payload.interace';
import { Userdata } from '../userdata/userdata.entity';
import { GenderType } from '../person/constants/gender.enum';
import { AppLoggerService } from 'src/log/applogger.service';
import { UserAlreadyRegisteredException } from 'src/common/exceptions/user-already-registered.exception';
import { WrongCredentialsException } from 'src/common/exceptions/wrong-credentials.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { SendService } from '../send-email/send.service';
import { SendMessageDto } from '../send-email/dto/sendMessage.dto';
import { UserdataStatus } from '../userdata/constants/user-status.enum';
import { UserFederatedException } from 'src/common/exceptions';
import { WrongRecoveryCredentialsException } from 'src/common/exceptions';
import { BlockedUserException } from 'src/common/exceptions';
import { genSalt, hash, compare } from 'bcryptjs';
import { SendRecoverPasswordDto } from '../send-email/dto/sendRecoverPassword.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _appLogger: AppLoggerService,
    private readonly _sendEmail: SendService
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
      
      const userDto = new SendMessageDto(user.email, user.person.first_name, user.person.last_name)
      this._sendEmail.send(userDto, 1)

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
    
    const userDto = new SendMessageDto(user.email, user.person.first_name, user.person.last_name)
    this._sendEmail.send(userDto, 1);

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

  async recoverUser(recoverData: RecoverUserDto): Promise<any> {
    const { useremail, document } = recoverData;

    const user: Userdata = await this._authRepository.findOne({
      where: { email: useremail },
    });

    if (!user) {
      this._appLogger.log('User not found');
      throw new UserNotFoundException();
    }

    if (user.status === UserdataStatus.BLOCKED) {
      this._appLogger.log('Impossible to recover blocked rated users');
      throw new BlockedUserException();
    }

    if (user.registration_type !== UserdataRegistrationType.REGULAR) {
      this._appLogger.log('Impossible to recover federated users');
      throw new UserFederatedException();
    }

    if (user.person.document !== document) {
      this._appLogger.log('Wrong identity document provided');
      throw new WrongRecoveryCredentialsException();
    }

    const newPassword = Math.random()
      .toString(36)
      .slice(-10);
    
    const userDto = new SendRecoverPasswordDto(user.email, user.person.first_name, user.person.last_name, newPassword)
    this._sendEmail.send(userDto, 3)
    
    console.log('newPassword :>> ', newPassword);
    const salt = await genSalt(10);
    const saltedPassword = await hash(newPassword, salt);

    await this._authRepository
      .createQueryBuilder()
      .update()
      .set({ password: saltedPassword, status: UserdataStatus.RESETED })
      .where('email = :email', { email: useremail })
      .execute();

    /*******
    Send email with new password
    Insert code here
    ********/

    return { response: 'New password set on user successfully' };
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
