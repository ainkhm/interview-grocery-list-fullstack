import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { config } from '@grocery-app/configs';

async function bootstrap(): Promise<void> {
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);
  const swagerConfig = new DocumentBuilder()
    .setTitle('Grocery List API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(config.validationOptions));
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, swagerConfig);
  SwaggerModule.setup(globalPrefix, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(config.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${config.PORT}/${globalPrefix}`,
  );
}
bootstrap();
