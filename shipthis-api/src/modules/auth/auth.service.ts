import { DiscountService } from './../discount/discount.service';
import { AuthRepository } from './repositories/auth.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto, RecoverRequestDto, RecoverUserDto } from './dto';
import { UserdataRegistrationType } from '../userdata/constants/user-registration.enum';
import { RolName } from '../rol/constants/rol-name.enum';
import { IJwtPayload } from './payloads/jwt-payload.interace';
import { Userdata } from '../userdata/entities/userdata.entity';
import { Discount } from '../discount/entities/discount.entity';
import { AppLoggerService } from 'src/log/applogger.service';
import { UserdataStatus } from '../userdata/constants/user-status.enum';
import {
  UserFederatedException,
  UserNotActiveException,
  WrongRoleTypeAccessException,
  WrongRecoveryCredentialsException,
  BlockedUserException,
  UserAlreadyRegisteredException,
  WrongCredentialsException,
  UserNotFoundException,
} from 'src/common/exceptions';
import { genSalt, hash, compare } from 'bcryptjs';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _appLogger: AppLoggerService,
    private readonly _emailService: EmailService,
    private readonly _discountServ: DiscountService,
  ) {}

  async googleLogin(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Google Login Service');
    return this.federatedLogin(signup, UserdataRegistrationType.GOOGLE);
  }

  async facebookLogin(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Facebook Login Service');
    return this.federatedLogin(signup, UserdataRegistrationType.FACEBOOK);
  }

  private async federatedLogin(
    signup: SignupDto,
    registrationType: string,
  ): Promise<{ token: string; userdata: any }> {
    //validating email no registeres
    const { useremail } = signup;
    const posibleUser: Userdata = await this._authRepository.fetchUser(
      useremail,
    );

    let user: Userdata;
    if (this.userIsRegistered(posibleUser)) {
      user = posibleUser;
    } else {
      user = await this.registerUser(signup, registrationType, RolName.CLIENT);
    }
    if (this.userIsNotActive(user)) {
      throw new UserNotActiveException();
    }
    return this.returnUser(user, this.userIsNotRegistered(posibleUser));
  }

  async clientSignup(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Client SignUP Service');
    return this.userSignup(signup, RolName.CLIENT);
  }

  async adminSignup(
    signup: SignupDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Admin SignUP Service');
    return this.userSignup(signup, RolName.ADMIN);
  }

  private async userSignup(
    signup: SignupDto,
    role: string,
  ): Promise<{ token: string; userdata: any }> {
    //validating email no registeres
    const { useremail } = signup;

    const posibleUser = await this._authRepository.fetchUser(useremail);

    let user: Userdata;

    if (this.userIsRegistered(posibleUser)) {
      throw new UserAlreadyRegisteredException();
    }

    user = await this.registerUser(
      signup,
      UserdataRegistrationType.REGULAR,
      role,
    );

    return this.returnUser(user);
  }

  async clientLogin(
    logindata: LoginDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Client Login Service');
    return this.userLogin(logindata, RolName.CLIENT);
  }

  async adminLogin(
    logindata: LoginDto,
  ): Promise<{ token: string; userdata: any }> {
    this._appLogger.log('Handling New Request: Admin Login Service');
    return this.userLogin(logindata, RolName.ADMIN);
  }

  private async userLogin(
    logindata: LoginDto,
    role: string,
  ): Promise<{ token: string; userdata: any }> {
    //validating email no registeres
    const { useremail, password: pwd } = logindata;

    const user: Userdata = await this._authRepository.fetchRegularUser(
      useremail,
    );

    if (this.userIsNotRegistered(user)) {
      throw new UserNotFoundException();
    }

    if (await this.passwordsDontMatch(pwd, user.password)) {
      throw new WrongCredentialsException();
    }

    if (this.userIsNotActive(user)) {
      throw new UserNotActiveException();
    }

    if (this.userRoleDontMatch(user, role)) {
      throw new WrongRoleTypeAccessException();
    }

    return this.returnUser(user);
  }
  async recoverUser(recoverData: RecoverUserDto): Promise<any> {
    this._appLogger.log('Handling New Request: User Recovery Request Service');
    const { useremail, password } = recoverData;
    const user: Userdata = await this._authRepository.fetchUser(useremail);

    if (this.userIsNotRegistered(user)) {
      throw new UserNotFoundException();
    }

    await this._authRepository.recoverUSer(useremail, password);

    return { response: 'New password set on user successfully' };
  }

  async attendRecoveryRequest(recoverData: RecoverRequestDto): Promise<any> {
    this._appLogger.log('Handling New Request: User Recovery Request Service');
    const { useremail, document } = recoverData;

    const user: Userdata = await this._authRepository.fetchUser(useremail);

    if (this.userIsNotRegistered(user)) {
      throw new UserNotFoundException();
    }

    if (this.userIsBlocked(user)) {
      throw new BlockedUserException();
    }

    if (this.userIsFederated(user)) {
      throw new UserFederatedException();
    }

    if (this.documentsDontMatch(user, document)) {
      throw new WrongRecoveryCredentialsException();
    }

    /* SEND EMAIL HERE */
    const payload: IJwtPayload = {
      id: user.user_id,
      email: user.email,
      rol: user.rol.name as RolName,
    };
    const token: string = await this._jwtService.sign(payload);

    await this._emailService.sendRecoveryEmail(token, user.email);

    return { response: 'Recovery email sent successfully' };
  }

  private async returnUser(
    user: Userdata,
    isNew: boolean = false,
  ): Promise<{ token: string; userdata: any; newUser: boolean }> {
    const payload: IJwtPayload = {
      id: user.user_id,
      email: user.email,
      rol: user.rol.name as RolName,
    };
    const token = await this._jwtService.sign(payload);
    const { password, ...userdata } = user;
    this._appLogger.log(`${user.rol.name} logged in successfully`);
    return { token, userdata, newUser: isNew };
  }

  private async registerUser(
    signup: SignupDto,
    registrationType: string,
    role: string,
  ): Promise<Userdata> {
    this._appLogger.log(
      `Registering new user. Registration type : ${registrationType}`,
    );
    const user: Userdata = await this._authRepository.signup(
      signup,
      registrationType,
      role,
    );

    if (this.userIsClient(user)) {
      const welcomeDiscount: Discount = await this._discountServ.assignWelcomeDiscount(
        user,
      );
      await this.sendWelcomeEmail(signup, welcomeDiscount);
    }

    this._appLogger.log(`NEW ${role} registered successfully`);
    return user;
  }

  private async generatePassword(): Promise<{
    newPassword: string;
    saltedPassword: string;
  }> {
    const newPassword = Math.random()
      .toString(36)
      .slice(-10);
    const salt = await genSalt(10);
    const saltedPassword = await hash(newPassword, salt);
    return { newPassword, saltedPassword };
  }

  private documentsDontMatch(user: Userdata, document: string): boolean {
    return user.person.document !== document;
  }

  private userIsClient(user: Userdata): boolean {
    return user.rol.name === RolName.CLIENT;
  }

  private userIsNotActive(user: Userdata): boolean {
    return user.status !== UserdataStatus.ACTIVE;
  }

  private userIsFederated(user: Userdata): boolean {
    return user.registration_type !== UserdataRegistrationType.REGULAR;
  }

  private userIsBlocked(user: Userdata): boolean {
    return user.status === UserdataStatus.BLOCKED;
  }

  private userIsRegistered(user: Userdata): boolean {
    return user ? true : false;
  }

  private userIsNotRegistered(user: Userdata): boolean {
    return !this.userIsRegistered(user);
  }

  private userRoleDontMatch(user: Userdata, role: string): boolean {
    return !user ? true : user.rol.name === role ? false : true;
  }

  private async sendWelcomeEmail(signup: SignupDto, welcomeDiscount: Discount) {
    this._emailService.sendWelcomeEmail(
      signup.useremail,
      signup.first_name,
      signup.last_name,
      welcomeDiscount.name,
      welcomeDiscount.percentage,
    );
  }

  private async passwordsDontMatch(
    providedPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await compare(providedPassword, hashedPassword);
    return !isMatch;
  }
}
