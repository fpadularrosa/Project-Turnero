import { IsNotEmpty } from "class-validator";

export class CreateTurnDto {
    @IsNotEmpty()
    eventDate: string;
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    service: string;
};