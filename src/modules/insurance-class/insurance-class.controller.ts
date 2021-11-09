import { Controller, Get, Post, Body, Patch, Param, Delete, Ip, Query } from '@nestjs/common';
import { InsuranceClassService } from './insurance-class.service';
import { CreateInsuranceClassDto } from './dto/create-insurance-class.dto';
import { UpdateInsuranceClassDto } from './dto/update-insurance-class.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { InsuranceClass } from 'entities/insurance-class.entity';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';

@Controller('insurance-class')
export class InsuranceClassController {
  constructor(private readonly insuranceClassService: InsuranceClassService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all Insurance Classes',
    type: [InsuranceClass],
  })
  findAll(@Query() pagiationQuery: PaginationQueryDto) {
    return this.insuranceClassService.findAll(pagiationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceClassService.findOne(+id);
  }

  @Post()
  create(@Body() createInsuranceClassDto: CreateInsuranceClassDto, @Ip() ip: string) {
    return this.insuranceClassService.create(createInsuranceClassDto, ip);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceClassDto: UpdateInsuranceClassDto, @Ip() ip: string) {
    return this.insuranceClassService.update(+id, updateInsuranceClassDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuranceClassService.remove(+id);
  }
}
