import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { AuthRepository } from '../repositories/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../payloads/jwt-payload.interace';
import { UserdataStatus } from 'src/modules/userdata/constants/user-status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = await this._authRepository.findOne({
      where: { email: email, status: UserdataStatus.ACTIVE },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
