import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class DiscountNotRegisteredException extends ShipthisException {
  constructor() {
    super(`Discount not registered on shipthis App`, HttpStatus.BAD_REQUEST);
  }
}