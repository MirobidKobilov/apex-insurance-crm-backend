import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { logConfiguration } from './configs';

@Module({
  imports: [WinstonModule.forRoot(logConfiguration)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
