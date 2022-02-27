import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig: any = config.get('server');
  const PORT = serverConfig.port;

  await app.listen(PORT);
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
