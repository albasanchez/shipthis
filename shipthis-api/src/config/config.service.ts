import * as fs from 'fs';
import { parse } from 'dotenv';
import { AppLoggerService } from 'src/log/applogger.service';
import { throws } from 'assert';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(private readonly _appLogger: AppLoggerService) {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      this._appLogger.log('Detected develoment environment');
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        this._appLogger.log('.env file does not exist');
        process.exit(0);
      }
      this._appLogger.log('Reading environment variables from .env file');
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string) {
    return this.envConfig[key];
  }

  getAll() {
    return this.envConfig;
  }
}
