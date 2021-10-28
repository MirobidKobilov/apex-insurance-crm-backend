import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PORT } from '@environments';
import { logger } from '@configs';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    logger.error('error from Main');
    await app.listen(PORT);
  } catch (e) {
    Logger.error(e);
  }
}

bootstrap().catch((e) => {
  throw e;
});
