import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { CalculationGroup } from "./calculation-group.entity";
import { RiskType } from "./risk-type.entity";

export enum Branch {
  GENERAL = 'GENERAL',
  PERSONAL = 'PERSONAL',
}

@Entity()
export class InsuranceClass extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  @ApiProperty()
  title: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  @ApiProperty()
  code: string;

  @Column({
    type: "enum",
    enum: Branch,
  })
  @ApiProperty({enum: Branch})
  branch: Branch;

  @Column({
    type: "varchar",
    length: 255,
  })
  @ApiProperty()
  description: string;

  @ApiProperty({type: () => CalculationGroup})
  @ManyToOne(type => CalculationGroup, calculationGroup => calculationGroup.insuranceClasses)
  calculationGroup: CalculationGroup;

  @ManyToOne(type => RiskType, riskType => riskType.InsuranceClass)
  @ApiProperty({type: () => RiskType})
  riskType: RiskType;
}
