import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class CommentNotFoundException extends ShipthisException {
  constructor() {
    super(`Comment not Found`, HttpStatus.NOT_FOUND);
  }
}
