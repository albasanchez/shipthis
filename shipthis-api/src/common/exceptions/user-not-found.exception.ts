import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class UserNotFoundException extends ShipthisException {
  constructor() {
    super(`User not regitered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}
