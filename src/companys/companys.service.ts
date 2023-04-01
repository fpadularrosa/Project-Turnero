import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, CompanyDocument } from './schema/companys.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Req, UploadedFile } from '@nestjs/common/decorators';
import { Express, Request } from 'express';
require('dotenv').config();
const { host, port } = process.env;

@Injectable()
export class CompanysService {
  constructor(@InjectModel(Company.name) private companyModule: Model<CompanyDocument>) { }

  async create(@Req() request: Request, createCompanyDto: CreateCompanyDto, @UploadedFile() file: Express.Multer.File) {
    await this.companyModule.create({ ...createCompanyDto });
    return "This action creates a new companie";
  }

  async findForFocus(@Req() request: Request) {
    const companys = await this.companyModule.find();
    return companys.filter(c => c.focus === request.params.focus);
  }

  async findByName(@Req() request: Request) {
   const companys = await this.companyModule.find();
   return companys.filter(c => c.name === request.params.name);
  }
}
