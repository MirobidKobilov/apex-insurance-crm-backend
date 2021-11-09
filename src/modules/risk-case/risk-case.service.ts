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
    @InjectRepository(RiskCase)
    private riskType: Repository<RiskType>
  ) {}
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.riskCase.find({
      where: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
      relations: ['riskType'],
    });
  }

  async findOne(id: number) {
    return await this.riskCase.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['riskType'],
    });
  }
  
  async create(createDto: CreateRiskCaseDto, ip: string) {
    const { riskTypeId, title } = createDto;
    const type = await this.riskType.findOne(riskTypeId);
    if(!type) {
      throw new NotFoundException(`Type of Risk with the id #${riskTypeId} not found`)
    }
    const riskCase = this.riskCase.create({
      title,
      riskType: type,
      createdIp: ip,
    });
    return await this.riskCase.save(riskCase);
  }

  async update(id: number, updateDto: UpdateRiskCaseDto, ip: string) {
    return await this.riskCase.update(id, {
      title: updateDto.title,
      modifiedIp: ip,
      modifiedDate: new Date(),
    });
  }

  async remove(id: number) {
    return await this.riskCase.update(id, {
      isDeleted: true,
    });
  }
}
