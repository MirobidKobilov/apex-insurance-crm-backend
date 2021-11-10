import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRiskTypeDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;
}
