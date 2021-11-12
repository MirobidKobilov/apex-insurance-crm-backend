import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { CalculationGroup } from 'entities/calculation-group.entity';
import { InsuranceClass } from 'entities/insurance-class.entity';
import { RiskType } from 'entities/risk-type.entity';
import { Repository } from 'typeorm';
import { CreateInsuranceClassDto } from './dto/create-insurance-class.dto';
import { UpdateInsuranceClassDto } from './dto/update-insurance-class.dto';

@Injectable()
export class InsuranceClassService {
  constructor(
    @InjectRepository(InsuranceClass)
    private insuranceClass: Repository<InsuranceClass>,

    @InjectRepository(RiskType)
    private riskType: Repository<RiskType>,

    @InjectRepository(CalculationGroup)
    private calculationGroup: Repository<CalculationGroup>,
  ) {}

  async findAll(pagiationQuery: PaginationQueryDto) {
    const { limit, page } = pagiationQuery;
    const classes = await this.insuranceClass.find({
      where: {
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit,
      relations: ['calculationGroup', 'riskType'],
    });
    const total = await this.insuranceClass.count();

    return {
      items: classes,
      total,
      page: +page,
      limit: +limit
    }
  }
  
  async findOne(id: number) {
    const insuranceClass = await this.insuranceClass.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['calculationGroup', 'riskType'],
    });
    if(!insuranceClass) {
      throw new NotFoundException(`InsuranceClass with the id #${id} not found`)
    }
    return insuranceClass
  }

  async create(createDto: CreateInsuranceClassDto, ip: string) {
    const { riskTypeId, calculationGroupId, ...clasItems } = createDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of risk wth the id #${riskTypeId} not found`)
    }
    const group = await this.calculationGroup.findOne(calculationGroupId);
    if(!group) {
      throw new NotFoundException(`Calculation Group with the id #${calculationGroupId} not found`)
    }
    const insuranceClass = this.insuranceClass.create({
      ...clasItems,
      calculationGroup: group,
      riskType: type,
      createdIp: ip,
    });

    return await this.insuranceClass.save(insuranceClass);
  }
  
  async update(id: number, updateDto: UpdateInsuranceClassDto, ip: string) {
    const { riskTypeId, calculationGroupId, ...classItems } = updateDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of risk wth the id #${riskTypeId} not found`)
    }
    const group = await this.calculationGroup.findOne(calculationGroupId);
    if(!group) {
      throw new NotFoundException(`Calculation Group with the id #${calculationGroupId} not found`)
    }
    const insurance =  await this.insuranceClass.preload({
      id,
      ...classItems,
      calculationGroup: group,
      riskType: type,
      modifiedDate: new Date(),
      modifiedIp: ip,
    });

    return await this.calculationGroup.save(insurance);
  }

  async remove(id: number) {
    return this.insuranceClass.update(id, {
      isDeleted: true,
    });
  }
}
