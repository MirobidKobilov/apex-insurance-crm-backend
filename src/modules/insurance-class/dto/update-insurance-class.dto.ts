import { PartialType } from '@nestjs/swagger';
import { CreateInsuranceClassDto } from './create-insurance-class.dto';

export class UpdateInsuranceClassDto extends PartialType(CreateInsuranceClassDto) {}
