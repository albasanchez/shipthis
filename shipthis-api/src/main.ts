import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/ExceptionFilter/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLoggerService } from './log/applogger.service';
import * as helmet from 'helmet';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setTitle('ShipThis API')
    .setDescription('The ShipThis platform API description')
    .setVersion('1.0')
    .addTag('ShipThis')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useLogger(new AppLoggerService());

  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix('shipthisapi/v1');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(AppModule.port);
}
bootstrap();
