import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestContextService } from '../../modules/request-context/request-context.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _requestContextService: RequestContextService,
  ) {}

  use(req: Request, res: Response, next: () => void): void {

    if (req.headers.authorization && !this._requestContextService.getUser()) {
      const token: string = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload: any = this._jwtService.decode(
          token.replace('"', '').slice(0, -1),
        );
        this._requestContextService.setUser(payload.id);
      }
    }

    next();
  }
}
