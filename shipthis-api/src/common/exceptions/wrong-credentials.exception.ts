import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class WrongCredentialsException extends ShipthisException {
  constructor() {
    super(
      `Tuple Email-Password provided doesn't match`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
