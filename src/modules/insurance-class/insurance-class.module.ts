import { Module } from '@nestjs/common';
import { InsuranceClassService } from './insurance-class.service';
import { InsuranceClassController } from './insurance-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceClass } from 'entities/insurance-class.entity';
import { RiskType } from 'entities/risk-type.entity';
import { CalculationGroup } from 'entities/calculation-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceClass, RiskType, CalculationGroup])],
  controllers: [InsuranceClassController],
  providers: [InsuranceClassService]
})
export class InsuranceClassModule {}
