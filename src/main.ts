import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 5000;


async function bootstrap() {
  const app : INestApplication = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
