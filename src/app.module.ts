import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { logConfiguration, TypeOrmConfigService } from '@configs';
import {TypeOrmModule} from "@nestjs/typeorm";
import { InsuranceClassModule } from './modules/insurance-class/insurance-class.module';
import { CalculationGroupModule } from './modules/calculation-group/calculation-group.module';
import { RiskTypeModule } from './modules/risk-type/risk-type.module';
import { RiskCaseModule } from './modules/risk-case/risk-case.module';
import { RiskExclusionModule } from './modules/risk-exclusion/risk-exclusion.module';


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
  }),
    WinstonModule.forRoot(logConfiguration),
    InsuranceClassModule,
    CalculationGroupModule,
    RiskTypeModule,
    RiskCaseModule,
    RiskExclusionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
