import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class CommercialAllyNotFoundException extends ShipthisException {
  constructor() {
    super(`Commercial Ally not registered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}