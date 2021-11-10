import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Ip } from '@nestjs/common';
import { RiskTypeService } from './risk-type.service';
import { CreateRiskTypeDto } from './dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk-type.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';

@Controller('risk-type')
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}
  
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.riskTypeService.findAll(paginationQuery);
  }

  @Get('/select')
  findForSelect() {
    return this.riskTypeService.findForSelect();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskTypeService.findOne(+id);
  }

  @Post()
  create(@Body() createRiskTypeDto: CreateRiskTypeDto, @Ip() ip: string) {
    return this.riskTypeService.create(createRiskTypeDto, ip);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskTypeDto: UpdateRiskTypeDto, @Ip() ip: string) {
    return this.riskTypeService.update(+id, updateRiskTypeDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskTypeService.remove(+id);
  }
}
