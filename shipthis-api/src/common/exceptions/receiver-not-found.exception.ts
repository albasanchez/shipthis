import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class ReceiverNotFoundException extends ShipthisException {
  constructor() {
    super(`Receiver couldn't be found. This user doesn't have associated receivers`, HttpStatus.NOT_FOUND);
  }
}