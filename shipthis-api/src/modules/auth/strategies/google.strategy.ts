import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly _config: ConfigService) {
    super({
      clientID: _config.get(Configuration.GOOGLE_CLIENT_ID),
      clientSecret: _config.get(Configuration.GOOGLE_SECRET),
      callbackURL: _config.get(Configuration.GOOGLE_CALLBACK_URL),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      google_id: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: profile.photos[0].value,
      language: profile._json.locale,
      accessToken,
    };
    done(null, user);
  }
}
