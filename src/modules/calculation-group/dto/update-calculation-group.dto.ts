import { PartialType } from "@nestjs/swagger";
import { CreateCalculationGroupDto } from "./create-calculation-group.dto";

export class UpdateCalculationGroupDto extends PartialType(CreateCalculationGroupDto) {}
