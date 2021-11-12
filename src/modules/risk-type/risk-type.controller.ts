import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Ip } from '@nestjs/common';
import { RiskTypeService } from './risk-type.service';
import { CreateRiskTypeDto } from './dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk-type.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Risk Type Methods')
@Controller('risk-type')
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}
  
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
