import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Branch } from "entities/insurance-class.entity";

export class CreateInsuranceClassDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  code: string;

  @IsEnum(Branch)
  @ApiProperty({ enum: Branch })
  branch: Branch;

  @IsString()
  @ApiProperty()
  description: string;
  
  @IsNumber()
  @ApiProperty()
  calculationGroupId: number;

  @IsNumber()
  @ApiProperty()
  riskTypeId: number;
}
