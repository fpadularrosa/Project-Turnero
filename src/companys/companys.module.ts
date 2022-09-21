import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schema/companys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Company.name,
      schema: CompanySchema
    }
  ])
],
  controllers: [CompanysController],
  providers: [CompanysService]
})
export class CompanysModule {}
