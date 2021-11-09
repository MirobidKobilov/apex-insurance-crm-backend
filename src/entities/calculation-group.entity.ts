import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { InsuranceClass } from "./insurance-class.entity";

@Entity()
export class CalculationGroup extends BaseEntity {
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
  
  @OneToMany(type => InsuranceClass, insuranceClass => insuranceClass.calculationGroup)
  insuranceClasses: InsuranceClass[];
}
