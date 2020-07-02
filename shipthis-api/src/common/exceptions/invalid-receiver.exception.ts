import { ShipthisException } from './abstract.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidReceiverException extends ShipthisException {
  constructor() {
    super(`Receiver and User don't match`, HttpStatus.BAD_REQUEST);
  }
}
