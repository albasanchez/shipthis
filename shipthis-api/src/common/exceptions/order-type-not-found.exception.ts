import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class OrderTypeNotFoundException extends ShipthisException {
  constructor() {
    super(`Order type not registered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}