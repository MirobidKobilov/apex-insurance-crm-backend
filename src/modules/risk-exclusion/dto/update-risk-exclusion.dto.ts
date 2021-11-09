import { PartialType } from '@nestjs/swagger';
import { CreateRiskExclusionDto } from './create-risk-exclusion.dto';

export class UpdateRiskExclusionDto extends PartialType(CreateRiskExclusionDto) {}
