import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/companys.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanysService {
  constructor(@InjectModel(Company.name) private companysModule: Model<CompanyDocument>){}

  async create(createCompanyDto: CreateCompanyDto) {
    const companyCreated = await this.companysModule.create(createCompanyDto);
    return companyCreated;
  }

  findAll() {
    return this.companysModule.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
