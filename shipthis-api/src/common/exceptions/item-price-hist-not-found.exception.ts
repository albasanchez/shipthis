import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class ItemPriceHistNotFoundException extends ShipthisException {
  constructor() {
    super(`ItemPriceHist not regitered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}
