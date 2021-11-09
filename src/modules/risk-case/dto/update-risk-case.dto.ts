import { PartialType } from '@nestjs/swagger';
import { CreateRiskCaseDto } from './create-risk-case.dto';

export class UpdateRiskCaseDto extends PartialType(CreateRiskCaseDto) {}
