import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { Express, Request } from 'express';

@ApiTags('companies')
@Controller('companies')
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './files',
  //     filename: function(req, file, cb) {
  //       cb(null, file.originalname + '_' + Date.now() + '.png');
  //     }
  //   })
  // }))
  @Post('create')
  create(@Req() request: Request, @Body() createCompanyDto: CreateCompanyDto, @UploadedFile() file: Express.Multer.File) {
    return this.companysService.create(request, createCompanyDto, file);
  }

  @Get('/perfocus:focus')
  findForFocus(@Req() request: Request) {
    return this.companysService.findForFocus(request);
  }

  @Get(':name')
  findByName(@Req() request: Request) {
    return this.companysService.findByName(request);
  }
}
