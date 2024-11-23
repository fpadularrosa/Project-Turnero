import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
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
  loginUser(@Res() response: Response, @Req() request: Request, @Body() userObject: LoginAuthDto) {
    return this.authService.login(response, request, userObject);
  }
}
