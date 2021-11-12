import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    console.log(paginationQuery);
    
    const types = await this.riskType.find({
      where: {
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit,
    });
    const total = await this.riskType.count();

    return {
      items: types,
      total,
      page: +page,
      limit: +limit
    }
  }

  async findOne(id: number) {
    const type = await this.riskType.findOne(id, {
      where: {
        isDeleted: false,
      }
    });
    if(!type) {
      throw new NotFoundException(`Risk Type with the id #${id} not found`)
    }
    return type;
  }

  async findForSelect() {
    const types = await this.riskType
    .createQueryBuilder("riskType")
    .select("id")
    .addSelect("title")
    .getRawMany();
    return types;
  }

  async create(createDto: CreateRiskTypeDto, ip: string) {
    const riskType = this.riskType.create({
      ...createDto,
      createdIp: ip,
    });
    return await this.riskType.save(riskType);
  }

  async update(id: number, updateDto: UpdateRiskTypeDto, ip: string) {
    const type =  await this.riskType.preload({
      id,
      ...updateDto,
      modifiedIp: ip,
      modifiedDate: new Date(),
    })

    return await this.riskType.save(type)
  }

  async remove(id: number) {
    return await this.riskType.update(id, {
      isDeleted: true,
    });
  }
}
