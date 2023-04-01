import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schema/companys.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Company.name,
      schema: CompanySchema
    },
  ]),
  //middleware multer to destinate uploaded images.
  // MulterModule.register({
  //   dest: './uploads'
  // })
],
  controllers: [CompanysController],
  providers: [CompanysService]
})
export class CompanysModule {}
