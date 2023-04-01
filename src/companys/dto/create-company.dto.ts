import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    ceo: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    email: string;
  
    @IsNumber()
    @IsNotEmpty()
    employees: number;
}
