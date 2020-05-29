import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class RolNotFoundException extends ShipthisException {
  constructor() {
    super(`Role couldn't be found`, HttpStatus.NOT_FOUND);
  }
}
