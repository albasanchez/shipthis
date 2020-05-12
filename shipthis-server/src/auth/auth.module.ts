import { Module } from '@nestjs/common';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { GoogleStrategy } from './google/google.strategy';
import { objectRepository } from 'src/dao/repository.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
@Module({
  exports:[],
  imports: [ PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, AuthService, JwtStrategy,...objectRepository],
})
export class AuthModule {}
