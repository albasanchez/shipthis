import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class UserFederatedException extends ShipthisException {
  constructor() {
    super(
      `The service only works for nofederated users`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
