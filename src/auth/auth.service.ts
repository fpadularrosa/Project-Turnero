import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/users.schema';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Company, CompanyDocument } from '../companys/schema/companys.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
  private readonly jwtService: JwtService
  ){}

  async register(@Body() userObject: RegisterAuthDto) {
    const { password, ceo } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };

    ceo ? this.companyModel.create(userObject) : this.userModel.create(userObject);
    return 'Registered successfully.';
  }

  async login(@Body() userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findCompany = await this.companyModel.findOne({ email }); 
    const findUser = await this.userModel.findOne({ email });

    if(!findUser && !findCompany) throw new HttpException('EMAIL_NOT_FOUND', 404);
    if(findCompany){
      const checkPassword = await compare(password, findCompany.password);

      if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);
  
      const payload = { 
        id: findCompany._id,
        name: findCompany.name
      };
  
      const token = this.jwtService.sign(payload);
      
      return {
        user: findCompany,
        token
      };
    }
    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

    const payload = { 
      id: findUser._id,
      name: findUser.name
    };

    const token = this.jwtService.sign(payload);

    return {
      user:findUser,
      token
    };
  }
}
