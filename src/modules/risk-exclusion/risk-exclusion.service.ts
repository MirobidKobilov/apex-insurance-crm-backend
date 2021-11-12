import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { RiskExclusion } from 'entities/risk-exclusion.entity';
import { RiskType } from 'entities/risk-type.entity';
import { Repository } from 'typeorm';
import { CreateRiskExclusionDto } from './dto/create-risk-exclusion.dto';
import { UpdateRiskExclusionDto } from './dto/update-risk-exclusion.dto';

@Injectable()
export class RiskExclusionService {
  constructor(
    @InjectRepository(RiskExclusion)
    private riskExclusion: Repository<RiskExclusion>,
    @InjectRepository(RiskType)
    private riskType: Repository<RiskType>
  ) {}
  
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    const exclusions = await this.riskExclusion.find({
      where: {
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit,
      relations: ['riskType'],
    });
    const total = await this.riskExclusion.count();

    return {
      items: exclusions,
      total,
      page: +page,
      limit: +limit
    } 
  }
  
  async findOne(id: number) {
    const exclusion =  await this.riskExclusion.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['riskType'],
    });
    if(!exclusion) {
      throw new NotFoundException(`Risk exclusion with the id #${id} not found`)
    }
    return exclusion;
  }

  async create(createDto: CreateRiskExclusionDto, ip: string) {
    const { riskTypeId, ...riskItems } = createDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const riskExclusion = this.riskExclusion.create({
      ...riskItems,
      riskType: type,
      createdIp: ip,
    });
    return await this.riskExclusion.save(riskExclusion);
  }

  async update(id: number, updateDto: UpdateRiskExclusionDto, ip: string) {
    const { riskTypeId, ...riskItems } = updateDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const risk =  await this.riskExclusion.preload({
      id,
      ...riskItems,
      riskType: type,
      modifiedIp: ip,
      modifiedDate: new Date(),
    })
    return await this.riskExclusion.save(risk);
  }

  async remove(id: number) {
    return await this.riskExclusion.update(id, {
      isDeleted: true,
    });
  }
}
