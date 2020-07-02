import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class InvalidAddressException extends ShipthisException {
  constructor() {
    super(`Provided Address is invalid`, HttpStatus.BAD_REQUEST);
  }
}
