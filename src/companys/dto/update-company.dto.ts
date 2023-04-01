import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    employees: number;

    @IsString()
    @IsOptional()
    ceo: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    email: string;
}
