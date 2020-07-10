import * as fs from 'fs';
import { parse } from 'dotenv';
import { AppLoggerService } from 'src/log/applogger.service';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(private readonly _appLogger: AppLoggerService) {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        this._appLogger.error('.env file does not exist');
        process.exit(0);
      }
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
