import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateRiskExclusionDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsInt()
  @ApiProperty()
  riskTypeId: number;
}
