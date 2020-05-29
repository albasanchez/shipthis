import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class WrongRecoveryCredentialsException extends ShipthisException {
  constructor() {
    super(`Tuple Email-Document doesn't match`, HttpStatus.BAD_REQUEST);
  }
}
