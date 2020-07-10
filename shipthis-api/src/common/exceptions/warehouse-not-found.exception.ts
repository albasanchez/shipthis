import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class WarehouseNotFoundException extends ShipthisException {
  constructor() {
    super(`Warehouse not regitered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}