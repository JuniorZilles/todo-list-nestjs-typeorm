import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import AppModule from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('TODO List API')
    .setDescription('API for TODO List')
    .setVersion('1.0')
    .addTag('task')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs-api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
