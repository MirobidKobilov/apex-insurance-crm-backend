import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateRiskCaseDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  riskTypeId?: number;
}
