import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { State } from '../enums/schema.enum';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    state: State;

    @IsOptional()
    companyId: string;
    
    @IsOptional()
    date: Date;
};