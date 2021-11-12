import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { RiskCase } from 'entities/risk-case.entity';
import { RiskType } from 'entities/risk-type.entity';
import { Repository } from 'typeorm';
import { CreateRiskCaseDto } from './dto/create-risk-case.dto';
import { UpdateRiskCaseDto } from './dto/update-risk-case.dto';

@Injectable()
export class RiskCaseService {
  constructor(
    @InjectRepository(RiskCase)
    private riskCase: Repository<RiskCase>,
    @InjectRepository(RiskType)
    private riskType: Repository<RiskType>
  ) {}
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    const cases = await this.riskCase.find({
      where: {
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit,
      relations: ['riskType'],
    });
    const total = await this.riskCase.count();

    return {
      items: cases,
      total,
      page: +page,
      limit: +limit
    } 
  }

  async findOne(id: number) {
    const riskCase =  await this.riskCase.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['riskType'],
    });
    if(!riskCase) {
      throw new NotFoundException(`Risk case with the id #${id} not found`)
    }
    return riskCase;
  }
  
  async create(createDto: CreateRiskCaseDto, ip: string) {
    const { riskTypeId, ...riskItems } = createDto;
    
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const riskCase = this.riskCase.create({
      ...riskItems,
      riskType: type,
      createdIp: ip,
    });
    return await this.riskCase.save(riskCase);
  }

  async update(id: number, updateDto: UpdateRiskCaseDto, ip: string) {
    const { riskTypeId, ...riskItems } = updateDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const risk =  await this.riskCase.preload({
      id,
      ...riskItems,
      riskType: type,
      modifiedIp: ip,
      modifiedDate: new Date(),
    });

    return await this.riskCase.save(risk);
  }

  async remove(id: number) {
    return await this.riskCase.update(id, {
      isDeleted: true,
    });
  }
}
