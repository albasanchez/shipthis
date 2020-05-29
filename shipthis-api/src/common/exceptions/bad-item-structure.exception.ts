import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class BadItemStructureException extends ShipthisException {
  constructor() {
    super(`Wrong Item structure`, HttpStatus.BAD_REQUEST);
  }
}
