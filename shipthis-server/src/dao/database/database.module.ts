import { Module } from '@nestjs/common';
import { databaseProviders } from './database';

@Module({
  providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
