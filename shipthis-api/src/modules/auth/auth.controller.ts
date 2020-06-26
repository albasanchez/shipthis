import { MapperSignupDto } from './../../mapper/maper-sigup';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, RecoverUserDto, SocialNetDto } from './dto';

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

  @Post('user-recovery')
  @UsePipes(ValidationPipe)
  recoverUser(@Body() recoverData: RecoverUserDto) {
    return this._authService.recoverUser(recoverData);
  }
}
