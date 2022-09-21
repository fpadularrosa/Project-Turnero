import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @MinLength(3)
    @MaxLength(70)
    password: string;
}
