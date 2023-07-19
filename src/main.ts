import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Simple Chat API')
    .setDescription(
      'Simple chat API that supports multiple conversations for several users',
    )
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api_docs', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  await app.listen(configService.getPort());
}

bootstrap();
