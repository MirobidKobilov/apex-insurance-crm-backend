import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { RiskExclusionService } from './risk-exclusion.service';
import { CreateRiskExclusionDto } from './dto/create-risk-exclusion.dto';
import { UpdateRiskExclusionDto } from './dto/update-risk-exclusion.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Risk Exclusion Methods')
@Controller('risk-exclusion')
export class RiskExclusionController {
  constructor(private readonly riskExclusionService: RiskExclusionService) {}
  
  @Get()
  @ApiQuery({
    name: 'page',
    example: 1,
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    example: 20,
    required: false,
    type: Number,
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.riskExclusionService.findAll(paginationQuery);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskExclusionService.findOne(+id);
  }

  @Post()
  create(@Body() createRiskExclusionDto: CreateRiskExclusionDto, @Ip() ip: string) {
    return this.riskExclusionService.create(createRiskExclusionDto, ip);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskExclusionDto: UpdateRiskExclusionDto, @Ip() ip: string) {
    return this.riskExclusionService.update(+id, updateRiskExclusionDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskExclusionService.remove(+id);
  }
}
