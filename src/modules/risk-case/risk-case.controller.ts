import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { RiskCaseService } from './risk-case.service';
import { CreateRiskCaseDto } from './dto/create-risk-case.dto';
import { UpdateRiskCaseDto } from './dto/update-risk-case.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';

@Controller('risk-case')
export class RiskCaseController {
  constructor(private readonly riskCaseService: RiskCaseService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.riskCaseService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskCaseService.findOne(+id);
  }
  
  @Post()
  create(@Body() createRiskCaseDto: CreateRiskCaseDto, @Ip() ip: string) {
    return this.riskCaseService.create(createRiskCaseDto, ip);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskCaseDto: UpdateRiskCaseDto, @Ip() ip: string) {
    return this.riskCaseService.update(+id, updateRiskCaseDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskCaseService.remove(+id);
  }
}
