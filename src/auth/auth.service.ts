import { HttpException, HttpStatus, Injectable, Res, Req, Session } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/users.schema';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Company, CompanyDocument } from '../companys/schema/companys.schema';
import { Response, Request, NextFunction } from 'express';
require('dotenv').config();
const { SECRET_SESSION } = process.env;

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
    private readonly jwtService: JwtService) { }

  async register(@Body() userObject: RegisterAuthDto, @Res() response: Response) {
    let { ceo } = userObject;

    ceo ? await this.companyModel.create(userObject) : await this.userModel.create(userObject);

    return response.status(HttpStatus.OK).json({ message: 'Successfully registered' });
  };

  async login(@Res() response: Response, @Body() userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findedCompany = await this.companyModel.findOne({ email });
    const findedUser = await this.userModel.findOne({ email });

    if (!findedUser && !findedCompany) throw new HttpException('EMAIL_NOT_FOUND', 404);

    if(findedCompany){
      const payload = { role: 'ceo', id: findedCompany['_id'] };

      const checkPassword = await compare(password, findedCompany.password);
      if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

      return response.json({
        access_token: await this.jwtService.sign(payload, { secret: SECRET_SESSION }),
      });
    };
    if(findedUser){
      const payload = { id: findedUser['_id'], role: findedUser['role'] };

      const checkPassword = await compare(password, findedUser.password);
      if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

      return response.json({
        access_token: await this.jwtService.sign(payload, { secret: SECRET_SESSION }),
      });
    };
};
}