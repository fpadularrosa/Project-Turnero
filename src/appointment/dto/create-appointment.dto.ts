import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAppointmentDto {
    @IsOptional()
    userId: string;
    
    @IsNotEmpty()
    nameCompany: string;
    
    @IsNotEmpty()
    date: string;
    
    @IsNotEmpty()
    month: string;
  
    @IsNotEmpty()
    year: string;
  
    @IsNotEmpty()
    time: string;
  
    @ApiProperty({ default: true })
    available: boolean;
};