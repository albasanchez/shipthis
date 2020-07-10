import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class WrongRoleTypeAccessException extends ShipthisException {
  constructor() {
    super(`Wrong Role type access`, HttpStatus.BAD_REQUEST);
  }
}
