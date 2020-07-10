import { MapperSignupDto } from './../../mapper/maper-sigup';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  LoginDto,
  RecoverRequestDto,
  SocialNetDto,
  RecoverUserDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('google-login')
  @UsePipes(ValidationPipe)
  googleLogin(@Body() user: SocialNetDto) {
    const signupData: SignupDto = MapperSignupDto.SignuoDtoFromSocialNetDto(
      user,
    );
    return this._authService.googleLogin(signupData);
  }

  @Post('facebook-login')
  @UsePipes(ValidationPipe)
  facebookLogin(@Body() user: SocialNetDto) {
    const signupData: SignupDto = MapperSignupDto.SignuoDtoFromSocialNetDto(
      user,
    );
    return this._authService.facebookLogin(signupData);
  }

  @Post('client-registration')
  @UsePipes(ValidationPipe)
  clientRegidstration(@Body() user: SignupDto): Promise<any> {
    return this._authService.clientSignup(user);
  }

  @Post('admin-registration')
  @UsePipes(ValidationPipe)
  adminRegidstration(@Body() user: SignupDto): Promise<any> {
    return this._authService.adminSignup(user);
  }

  @Post('client-login')
  @UsePipes(ValidationPipe)
  clientLogin(@Body() credentials: LoginDto): Promise<any> {
    return this._authService.clientLogin(credentials);
  }

  @Post('admin-login')
  @UsePipes(ValidationPipe)
  adminLogin(@Body() credentials: LoginDto): Promise<any> {
    return this._authService.adminLogin(credentials);
  }

  @Post('recovery-request')
  @UsePipes(ValidationPipe)
  recoverUserRequest(@Body() recoverData: RecoverRequestDto) {
    return this._authService.attendRecoveryRequest(recoverData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('user-recovery')
  @UsePipes(ValidationPipe)
  recoverUserChange(@Body() recoverData: RecoverUserDto) {
    return this._authService.recoverUser(recoverData);
  }
}
