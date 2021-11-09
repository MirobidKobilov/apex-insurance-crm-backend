import { Injectable, Ip } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { CalculationGroup } from 'entities/calculation-group.entity';
import { Repository } from 'typeorm';
import { CreateCalculationGroupDto } from './dto/create-calculation-group.dto';
import { UpdateCalculationGroupDto } from './dto/update-calculation-group.dto';

@Injectable()
export class CalculationGroupService {
  constructor(
    @InjectRepository(CalculationGroup)
    private calculationGroup: Repository<CalculationGroup>
  ) {}
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.calculationGroup.find({
      where:{
        isDeleted: false,
      },
      skip: offset,
      take: limit,
      relations: ['insuranceClasses']
    });
  }

  async findOne(id: number) {
    return await this.calculationGroup.findOne(id, {
      where: {
        isDeleted: false,
      },
      relations: ['insuranceClasses']
    });
  }

  async create(createDto: CreateCalculationGroupDto, ip: string) {
    const group =  this.calculationGroup.create({
      ...createDto,
      createdIp: ip,
    });
    return await this.calculationGroup.save(group);
  }

  async update(id: number, updateDto: UpdateCalculationGroupDto, ip: string) {
    return await this.calculationGroup.update(id, {
      title: updateDto.title,
      code: updateDto.code,
      modifiedIp: ip,
      modifiedDate: new Date(),
    });
  }

  async remove(id: number) {
    return await this.calculationGroup.update(id, {
      isDeleted: true,
    });
  }
}
