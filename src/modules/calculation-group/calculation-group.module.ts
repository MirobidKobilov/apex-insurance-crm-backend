import { Module } from '@nestjs/common';
import { CalculationGroupService } from './calculation-group.service';
import { CalculationGroupController } from './calculation-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationGroup } from 'entities/calculation-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalculationGroup])],
  controllers: [CalculationGroupController],
  providers: [CalculationGroupService]
})
export class CalculationGroupModule {}
