import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class DiscountNotFoundException extends ShipthisException {
  constructor() {
    super(`Impossible to find discount on user`, HttpStatus.BAD_REQUEST);
  }
}
