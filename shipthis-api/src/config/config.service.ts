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
        CONNECTION: process.env.CONNECTION,
        HOST: process.env.HOST,
        DBPORT: process.env.DBPORT,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        DATABASE: process.env.DATABASE,
        SYNCHRONIZE: process.env.SYNCHRONIZE,
        LOGGING: process.env.LOGGING,
        ENTITIES: process.env.ENTITIES,
        MIGRATIONS: process.env.MIGRATIONS,
        JWT_SECRET: process.env.JWT_SECRET,
        SEND_GRID_KEY: process.env.SEND_GRID_KEY,
        SEND_GRID_EMAIL: process.env.SEND_GRID_EMAIL,
        SEND_GRID_TEMPLATE: process.env.SEND_GRID_TEMPLATE,
        BOT_URL: process.env.BOT_URL,
        TELEGRAM_ACCESS_TOKEN: process.env.TELEGRAM_ACCESS_TOKEN,
        POE_API_TOKEN: process.env.POE_API_TOKEN,
        POE_ID: process.env.POE_ID,
        POE_TYPE: process.env.POE_TYPE,
        POE_URL: process.env.POE_URL,
        LOCATION_IQ_TOKEN: process.env.LOCATION_IQ_TOKEN,
        TRACKING_URL: process.env.TRACKING_URL,
        PICKUP_URL: process.env.PICKUP_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        SEND_GRID_RECOVERY_TEMPLATE: process.env.SEND_GRID_RECOVERY_TEMPLATE,
        LOCATION_IQ_DELAY: process.env.LOCATION_IQ_DELAY,
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
