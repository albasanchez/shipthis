import { ShipthisException } from './abstract.exception';
import { HttpStatus } from '@nestjs/common';

export class LocatorConectionException extends ShipthisException {
  constructor() {
    super(
      `Trouble with conection in route generation`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
