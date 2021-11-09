import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { RiskType } from "./risk-type.entity";

@Entity()
export class RiskCase extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  @ApiProperty()
  title: string;

  @ManyToOne(type => RiskType, riskType => riskType.riskCases)
  riskType: RiskType;
}