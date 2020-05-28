import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class OfficeNotFoundException extends ShipthisException {
  constructor() {
    super(`Office not regitered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}
