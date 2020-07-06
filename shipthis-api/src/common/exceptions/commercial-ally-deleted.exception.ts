import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class CommercialAllyDeletedException extends ShipthisException {
  constructor() {
    super(`Commercial Ally have been deleted of shipthis App`, HttpStatus.NOT_FOUND);
  }
}