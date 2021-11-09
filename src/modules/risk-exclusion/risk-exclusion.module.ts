import { Module } from '@nestjs/common';
import { RiskExclusionService } from './risk-exclusion.service';
import { RiskExclusionController } from './risk-exclusion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskExclusion } from 'entities/risk-exclusion.entity';
import { RiskType } from 'entities/risk-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskExclusion, RiskType])],
  controllers: [RiskExclusionController],
  providers: [RiskExclusionService]
})
export class RiskExclusionModule {}
