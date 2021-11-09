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
  
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.riskExclusion.find({
      where: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
      relations: ['riskType'],
    });
  }
  
  async findOne(id: number) {
    return await this.riskExclusion.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['riskType'],
    });
  }

  async create(createDto: CreateRiskExclusionDto, ip: string) {
    const { riskTypeId, title } = createDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const riskExclusion = this.riskExclusion.create({
      title,
      riskType: type,
      createdIp: ip,
    });
    return await this.riskExclusion.save(riskExclusion);
  }

  async update(id: number, updateDto: UpdateRiskExclusionDto, ip: string) {
    return await this.riskExclusion.update(id, {
      title: updateDto.title,
      modifiedIp: ip,
      modifiedDate: new Date(),
    })
  }

  async remove(id: number) {
    return await this.riskExclusion.update(id, {
      isDeleted: true,
    });
  }
}
