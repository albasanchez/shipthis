import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class ReceiverNotFoundException extends ShipthisException {
  constructor() {
    super(`Receiver couldn't be found`, HttpStatus.NOT_FOUND);
  }
}