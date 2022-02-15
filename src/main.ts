import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TrimDataPipe } from './shared/pipes/trim-data.pipe';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(), new TrimDataPipe());
  app.enableCors({ origin: ['http://localhost:4200'] });
  const config = new DocumentBuilder()
    .setTitle('Sahti API Specifications')
    .setDescription('This is sahti backend API specifications')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
}
bootstrap();
