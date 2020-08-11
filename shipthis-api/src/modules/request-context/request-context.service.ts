import { Injectable } from '@nestjs/common';
import * as contextService from 'request-context';

@Injectable()
export class RequestContextService {
  public setUser(id: number): void {
    contextService.set('request:user', id);
  }

  public getUser(): number {
    return contextService.get('request:user');
  }
}
