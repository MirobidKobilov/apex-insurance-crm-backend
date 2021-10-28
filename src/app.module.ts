import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { logConfiguration, TypeOrmConfigService } from '@configs';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
  }),
    WinstonModule.forRoot(logConfiguration)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
