import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    ceo: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    employees: number;
}
