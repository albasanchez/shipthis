import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class OrdersheetNotFoundException extends ShipthisException {
  constructor() {
    super(`Ordersheet couldn't be found`, HttpStatus.NOT_FOUND);
  }
}
