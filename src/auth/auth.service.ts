import { HttpException, HttpStatus, Injectable, Res, Req, Body } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Company } from '../companys/entities/company.entity';
import { Response, Request } from 'express';
require('dotenv').config();
const { SECRET_SESSION } = process.env;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Company) private readonly companys: Repository<Company>,
    private readonly jwtService: JwtService,
  ) {}

  async register(@Body() userObject: RegisterAuthDto, @Res() response: Response) {
    try {
      let { ceo } = userObject;
  
      if (ceo) {
        await this.companys.save(userObject);
      } else {
        await this.users.save(userObject);
      }
  
      return response.status(HttpStatus.OK).json({ message: 'Successfully registered' });
    } catch (error) {
      throw new HttpException('Error registering', HttpStatus.BAD_REQUEST);
    }
  }

  async login(@Res() response: Response, @Req() request: Request, @Body() userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findedCompany = await this.companys.findOne({ where: { email } });
    const findedUser = await this.users.findOne({ where: { email } });

    if (!findedUser && !findedCompany) throw new HttpException('EMAIL_NOT_FOUND', 404);

    if (findedCompany) {
      request.user = "company";
      const payload = { id: findedCompany.id };

      const checkPassword = await compare(password, findedCompany.password);
      if (!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

      return response.json({
        access_token: this.jwtService.sign(payload, { secret: SECRET_SESSION }),
      });
    }

    if (findedUser) {
      request.user = "user";
      const payload = { id: findedUser.id };

      const checkPassword = await compare(password, findedUser.password);
      if (!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

      return response.json({
        access_token: await this.jwtService.sign(payload, { secret: SECRET_SESSION }),
      });
    }
  }
}