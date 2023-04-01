import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(70)
    password: string;
}
