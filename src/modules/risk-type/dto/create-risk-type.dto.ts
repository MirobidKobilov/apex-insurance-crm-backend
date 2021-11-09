import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRiskTypeDto {
  @IsString()
  @ApiProperty()
  title: string;
}
