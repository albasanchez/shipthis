import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class DiscountDeletedException extends ShipthisException {
  constructor() {
    super(`Discount has been deleted of shipthis App`, HttpStatus.NOT_FOUND);
  }
}