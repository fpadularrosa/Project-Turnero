import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/companys.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanysService {
  findById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Company.name) private companyModule: Model<CompanyDocument>){}

  async create(createCompanyDto: CreateCompanyDto) {
    let companyCreated = await this.companyModule.create(createCompanyDto);
    return "This action creates a new companie";
  }

  findAll() {
    
    return this.companyModule.find({});
  }

  async findOne(companyName: string) {
    const companys = await this.companyModule.find({});
    const findedCompany = companys?.find(companyObject => companyObject.name.toLowerCase().trim() === companyName.toLowerCase().trim());
    const company = findedCompany.toJSON();
    delete company.password;
    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
