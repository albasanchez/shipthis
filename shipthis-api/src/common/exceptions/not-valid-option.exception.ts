import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class NotValidOptionException extends ShipthisException {
  constructor() {
    super(`Option is not valid`, HttpStatus.BAD_REQUEST);
  }
}
