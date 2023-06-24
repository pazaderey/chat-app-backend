import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Simple Chat API')
    .setDescription(
      'Simple chat API that supports multiple conversations for several users',
    )
    .setVersion('1.0.0')
    .addTag('Messenger')
    .addTag('API')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api_docs', app, swaggerDocument);

  await app.listen(configService.getPort());
}
bootstrap();
