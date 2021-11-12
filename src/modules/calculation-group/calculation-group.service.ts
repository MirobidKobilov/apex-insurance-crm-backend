import { Injectable, Ip, NotFoundException } from '@nestjs/common';
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
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    const total = await this.calculationGroup.count();
    const groups = await this.calculationGroup.find({
      where: {
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit
    });
    return {
        items: groups,
        total,
        page: +page,
        limit: +limit
    }
  }

  async findOne(id: number) {
    const group = await this.calculationGroup.findOne(id, {
      where: {
        isDeleted: false,
      }
    });
    if(!group) {
      throw new NotFoundException(`Calculation group with the id #${id} not found`)
    }
    return group
  }

  async findForSelect() {
    const groups = await this.calculationGroup
    .createQueryBuilder("calculationGroup")
    .select("id")
    .addSelect("title")
    .getRawMany();
    return groups;
  }

  async create(createDto: CreateCalculationGroupDto, ip: string) {
    const group =  this.calculationGroup.create({
      ...createDto,
      createdIp: ip,
    });
    return await this.calculationGroup.save(group);
  }

  async update(id: number, updateDto: UpdateCalculationGroupDto, ip: string) {
    const group = await this.calculationGroup.preload({
      id,
      ...updateDto,
      modifiedIp: ip,
      modifiedDate: new Date(),
    })
    return await this.calculationGroup.save(group)
  }

  async remove(id: number) {
    return await this.calculationGroup.update(id, {
      isDeleted: true,
    });
  }
}
