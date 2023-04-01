import { Prop } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsString()
    @Prop()
    name: string;

    @IsString()
    @Prop()
    ceo: string;
}
