import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class PickupNotFoundException extends ShipthisException {
  constructor() {
    super(`Pickup couldn't be found`, HttpStatus.NOT_FOUND);
  }
}
