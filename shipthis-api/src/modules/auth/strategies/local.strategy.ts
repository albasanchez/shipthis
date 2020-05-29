import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../payloads/jwt-payload.interace';
import { UserdataStatus } from 'src/modules/userdata/constants/user-status.enum';
import { ILocalPayload } from '../payloads/local-payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super();
  }

  async validate(payload: ILocalPayload): Promise<any> {
    const { email, password } = payload;
    const user = await this._authRepository.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
