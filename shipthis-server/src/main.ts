import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppExceptionsFilter } from './common/ExceptionFilter/exceptions.filtet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLogger } from './log/applogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useGlobalFilters(new AppExceptionsFilter());

  const options = new DocumentBuilder()
    .setTitle('ShipThis API')
    .setDescription('The ShipThis platform API description')
    .setVersion('1.0')
    .addTag('ShipThis')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useLogger(new AppLogger());

  await app.listen(3000);
}
bootstrap();
