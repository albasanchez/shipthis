import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/ExceptionFilter/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLoggerService } from './log/applogger.service';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
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

  app.setGlobalPrefix('shipthisapi/v1');

  await app.listen(AppModule.port);
}
bootstrap();
