import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, RecoverUserDto } from './dto';

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

  @Post('registration')
  @UsePipes(ValidationPipe)
  noferedatedRegidstration(@Body() user: SignupDto): Promise<any> {
    return this._authService.regularSignup(user);
  }

  @Post('regularlogin')
  @UsePipes(ValidationPipe)
  nofederatedLogin(@Body() credentials: LoginDto): Promise<any> {
    return this._authService.regularLogin(credentials);
  }

  @Post('recoveruser')
  @UsePipes(ValidationPipe)
  recoverUser(@Body() recoverData: RecoverUserDto) {
    return this._authService.recoverUser(recoverData);
  }
}
