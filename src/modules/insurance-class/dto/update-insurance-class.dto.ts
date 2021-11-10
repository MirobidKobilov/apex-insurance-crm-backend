import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Branch } from "entities/insurance-class.entity";

export class UpdateInsuranceClassDto {

  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  code?: string;

  @IsOptional()
  @IsEnum(Branch)
  @ApiProperty({ enum: Branch })
  branch?: Branch;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  calculationGroupId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  riskTypeId?: number;
}
