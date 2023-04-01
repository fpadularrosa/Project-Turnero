import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto, @Res() response: Response) {
    return this.authService.register(userObject, response);
  }

  @Post('login')
  loginUser(@Res() response: Response, @Body() userObject: LoginAuthDto) {
    return this.authService.login(response, userObject);
  }
}
