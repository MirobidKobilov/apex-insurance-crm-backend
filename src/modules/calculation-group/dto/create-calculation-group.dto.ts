import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCalculationGroupDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  code: string;
}
