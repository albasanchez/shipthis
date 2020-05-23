import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class UserAlreadyRegisteredException extends ShipthisException {
  constructor() {
    super(`The email already exist in database`, HttpStatus.BAD_REQUEST);
  }
}
