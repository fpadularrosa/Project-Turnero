import { Prop } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @Prop()
    name: string;

    @Prop()
    ceo: string;
}
