import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class BlockedUserException extends ShipthisException {
  constructor() {
    super(`User has is registered as BLOCKED`, HttpStatus.BAD_REQUEST);
  }
}
