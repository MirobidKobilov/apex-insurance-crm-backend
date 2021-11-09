import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { CalculationGroupService } from './calculation-group.service';
import { CreateCalculationGroupDto } from './dto/create-calculation-group.dto';
import { UpdateCalculationGroupDto } from './dto/update-calculation-group.dto';

@Controller('calculation-group')
export class CalculationGroupController {
  constructor(private readonly calculationGroupService: CalculationGroupService) {}
  
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.calculationGroupService.findAll(paginationQuery);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculationGroupService.findOne(+id);
  }

  @Post()
  create(@Body() createCalculationGroupDto: CreateCalculationGroupDto, @Ip() ip: string) {
    return this.calculationGroupService.create(createCalculationGroupDto, ip);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalculationGroupDto: UpdateCalculationGroupDto, @Ip() ip: string) {
    return this.calculationGroupService.update(+id, updateCalculationGroupDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculationGroupService.remove(+id);
  }
}
