import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const PORT = 3001;
  await app.listen(3001);
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
