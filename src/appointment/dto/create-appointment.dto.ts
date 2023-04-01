import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { State } from "../enums/schema.enum";

export class CreateAppointmentDto {
    @IsOptional()
    userId: string;
    
    @IsNotEmpty()
    companyId: string;
    
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ enum: ['Suspended', 'Confirmed', 'Free'], default: 'Free' })
    state: State;
};