import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @Post('create')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companysService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companysService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.companysService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companysService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companysService.remove(+id);
  }
}
