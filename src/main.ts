import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PORT } from '@environments';
import { logger } from '@configs';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Crm Project Management")
        .setDescription("Crm Project Management API Docs")
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
    await app.listen(PORT);
  } catch (e) {
    Logger.error(e);
  }
}

bootstrap().catch((e) => {
  throw e;
});
