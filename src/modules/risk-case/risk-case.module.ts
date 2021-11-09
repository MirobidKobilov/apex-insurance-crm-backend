import { Module } from '@nestjs/common';
import { RiskCaseService } from './risk-case.service';
import { RiskCaseController } from './risk-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskCase } from 'entities/risk-case.entity';
import { RiskType } from 'entities/risk-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskCase, RiskType])],
  controllers: [RiskCaseController],
  providers: [RiskCaseService]
})
export class RiskCaseModule {}
