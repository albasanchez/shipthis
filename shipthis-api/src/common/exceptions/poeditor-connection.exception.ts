import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class POEditorConnectionException extends ShipthisException {
  constructor() {
    super(
      `Problems connecting with POEditor Platform`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
