import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from '@environments';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
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
