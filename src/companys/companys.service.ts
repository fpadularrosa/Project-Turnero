import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UploadedFile } from '@nestjs/common/decorators';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';

@Injectable()
export class CompanysService {
  constructor(@InjectRepository(Company) private companys: Repository<Company>) { }

  async create(@Req() request: Request, createCompanyDto: CreateCompanyDto, @UploadedFile() file: Express.Multer.File) {
    await this.companys.save(createCompanyDto);
    return "This action creates a new companie";
  }

  async findForFocus(@Req() request: Request) {
    const companys = await this.companys.find();
    return companys.filter(c => c.focus === request.params.focus);
  }

  async findByName(@Req() request: Request) {
   const companys = await this.companys.find();
   return companys.filter(c => c.name === request.params.name);
  }
}
