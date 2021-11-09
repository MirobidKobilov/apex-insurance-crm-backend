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
    private insuranceClassRepository: Repository<InsuranceClass>,

    @InjectRepository(RiskType)
    private riskType: Repository<RiskType>,

    @InjectRepository(CalculationGroup)
    private calculationGroup: Repository<CalculationGroup>,
  ) {}
  findAll(pagiationQuery: PaginationQueryDto) {
    const { limit, offset } = pagiationQuery;
    return this.insuranceClassRepository.find({
      where: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
      relations: ['calculationGroup', 'riskTypes'],
    });
  }
  
  async findOne(id: number) {
    return await this.insuranceClassRepository.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['calculationGroup', 'riskTypes'],
    });
  }

  async create(createDto: CreateInsuranceClassDto, ip: string) {
    const { riskTypeId, calculationGroupId, title, code, description } = createDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of risk wth the id #${riskTypeId} not found`)
    }
    const group = await this.calculationGroup.findOne(calculationGroupId);
    if(!group) {
      throw new NotFoundException(`Calculation Group with the id #${calculationGroupId} not found`)
    }
    const insuranceClass = this.insuranceClassRepository.create({
      calculationGroup: group,
      riskType: type,
      title: title,
      code: code,
      description: description,
      createdIp: ip,
    });

    return await this.insuranceClassRepository.save(insuranceClass);
  }
  
  async update(id: number, updateDto: UpdateInsuranceClassDto, ip: string) {
    const { riskTypeId, calculationGroupId, title, code, description } = updateDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of risk wth the id #${riskTypeId} not found`)
    }
    const group = await this.calculationGroup.findOne(calculationGroupId);
    if(!group) {
      throw new NotFoundException(`Calculation Group with the id #${calculationGroupId} not found`)
    }
    return await this.insuranceClassRepository.update(id, {
      calculationGroup: group,
      riskType: type,
      title: title,
      code: code,
      description: description,
      modifiedDate: new Date(),
      modifiedIp: ip,
    });
  }

  async remove(id: number) {
    return this.insuranceClassRepository.update(id, {
      isDeleted: true,
    });
  }
}
