import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsPositive()
  @Type(() => Number)
  page: number;
}
