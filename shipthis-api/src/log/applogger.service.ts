import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends Logger {
  log(message: string) {
    console.log(message);
    super.log(message);
  }

  error(message: string, trace: string) {
    console.error(message);
    super.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
    super.warn(message);
  }

  debug(message: string) {
    console.debug(message);
    super.debug(message);
  }

  verbose(message: string) {
    console.log(message);
    super.verbose(message);
  }
}
