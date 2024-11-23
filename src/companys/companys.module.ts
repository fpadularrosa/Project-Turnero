import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
      MulterModule.register({
      dest: './uploads'
    })
],
  controllers: [CompanysController],
  providers: [CompanysService]
})
export class CompanysModule {}
