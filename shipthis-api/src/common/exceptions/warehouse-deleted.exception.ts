import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class WarehouseDeletedException extends ShipthisException {
  constructor() {
    super(`Warehouse have been deleted of shipthis App`, HttpStatus.NOT_FOUND);
  }
}