import { HttpStatus } from '@nestjs/common';
import { ShipthisException } from './abstract.exception';

export class CharacteristicNotFoundException extends ShipthisException {
  constructor() {
    super(`Characteristic not registered on shipthis App`, HttpStatus.NOT_FOUND);
  }
}