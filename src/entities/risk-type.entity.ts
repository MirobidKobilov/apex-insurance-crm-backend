import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { InsuranceClass } from "./insurance-class.entity";
import { RiskCase } from "./risk-case.entity";
import { RiskExclusion } from "./risk-exclusion.entity";

@Entity()
export class RiskType extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  @ApiProperty()
  title: string;

  @OneToMany(type => RiskExclusion, riskExclusion => riskExclusion.riskType)
  @ApiProperty({type: () => RiskExclusion})
  riskExclusions: RiskExclusion[];

  @OneToMany(type => RiskCase, riskCase => riskCase.riskType)
  @ApiProperty({type: () => RiskCase})
  riskCases: RiskCase[];

  @OneToMany(type => InsuranceClass, insuranceClass => insuranceClass.riskType)
  InsuranceClass: InsuranceClass[];
}
