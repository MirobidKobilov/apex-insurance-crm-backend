import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { RiskType } from 'entities/risk-type.entity';
import { Repository } from 'typeorm';
import { CreateRiskTypeDto } from './dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk-type.dto';

@Injectable()
export class RiskTypeService {
  constructor(
    @InjectRepository(RiskType)
    private riskType: Repository<RiskType>
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.riskType.find({
      where: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.riskType.findOne(id, {
      where: {
        isDeleted: false,
      }
    });
  }

  async create(createDto: CreateRiskTypeDto, ip: string) {
    const riskType = this.riskType.create({
      ...createDto,
      createdIp: ip,
    });
    return await this.riskType.save(riskType);
  }

  async update(id: number, updateDto: UpdateRiskTypeDto, ip: string) {
    return await this.riskType.update(id, {
      title: updateDto.title,
      modifiedIp: ip,
      modifiedDate: new Date(),
    })
  }

  async remove(id: number) {
    return await this.riskType.update(id, {
      isDeleted: true,
    });
  }
}
