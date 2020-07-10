import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class UserNotActiveException extends ShipthisException {
  constructor() {
    super(`User status is not Active`, HttpStatus.UNAUTHORIZED);
  }
}
