import { Controller, Get, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { AppLoggerService } from 'src/log/applogger.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('googlelogin')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('googleredirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const signupData: SignupDto = this._authService.generateSignuoDtoFromGoogle(
      req.user,
    );
    return this._authService.googleLogin(signupData);
  }
}
