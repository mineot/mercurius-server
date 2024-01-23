import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

// https://github.com/hcodebr/nestjs-typeorm-mysql
// https://github.com/hcodebr/nestjs-prisma-mysql
