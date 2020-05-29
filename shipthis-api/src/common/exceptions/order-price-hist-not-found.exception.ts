import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class OrderPriceHistNotFoundException extends ShipthisException {
  constructor() {
    super(`OrderPriceHist not regitered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}
