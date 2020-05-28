import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class EmptyDestinationException extends ShipthisException {
  constructor() {
    super(
      `Impossible to register order without destination`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
