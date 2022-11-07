import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsOptional()
    nameCompany: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    date: string;
    
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    month: string;
  
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    year: string;
  
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    time: string;
  
    @IsNotEmpty()
    @IsOptional()
    @IsBoolean()
    available: boolean;

    @IsOptional()
    userId: string;
};