import { HttpException } from '@nestjs/common';

export abstract class ShipthisException extends HttpException {
  errorMessage: string;

  constructor(message: string, status: number) {
    super(message, status);
    this.errorMessage = message;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
