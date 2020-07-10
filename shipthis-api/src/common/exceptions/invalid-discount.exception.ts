import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class InvalidDiscountException extends ShipthisException {
  constructor() {
    super(`Discount is either used or expired`, HttpStatus.BAD_REQUEST);
  }
}
