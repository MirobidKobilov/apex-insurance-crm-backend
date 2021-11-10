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
    const { limit, page } = paginationQuery;
    return this.calculationGroup.find({
      where:{
        isDeleted: false,
      },
      skip: (page -1 ) * limit,
      take: limit
    });
  }

  async findForSelect() {
    const groups = await this.calculationGroup
    .createQueryBuilder("calculationGroup")
    .select("id")
    .addSelect("title")
    .getRawMany();
    return groups;

// result will be like this: [{ id: 1, sum: 25 }, { id: 2, sum: 13 }, ...]
  }

  async findOne(id: number) {
    return await this.calculationGroup.findOne(id, {
      where: {
        isDeleted: false,
      }
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
