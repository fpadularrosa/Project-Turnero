import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body } from '@nestjs/common';
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
  private readonly jwtService: JwtService){}

  async register(@Body() userObject: RegisterAuthDto) {
    const { password, ceo } = userObject;
    
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };

    ceo ? this.companyModel.create(userObject) : this.userModel.create(userObject);
    return 'Registered successfully.';
  };

  async login(@Body() userObject: LoginAuthDto) {
    const { email, password } = userObject;

    const findedCompany = await this.companyModel.findOne({ email }); 
    const findedUser = await this.userModel.findOne({ email });

    if(!findedUser && !findedCompany) throw new HttpException('EMAIL_NOT_FOUND', 404);
    if(findedCompany){
      const checkPassword = await compare(password, findedCompany.password);

      if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);
  
      const payload = { 
        id: findedCompany._id,
        name: findedCompany.name
      };
  
      const token = this.jwtService.sign(payload);
      const company = findedCompany.toJSON();
      delete company.password;
      
      return {
        company,
        token
      };
    };
    const checkPassword = await compare(password, findedUser.password);

    if(!checkPassword) throw new HttpException('CREDENTIALS_INCORRECT', 403);

    const payload = { 
      id: findedUser._id,
      name: findedUser.name
    };

    const token = this.jwtService.sign(payload);
    const user = findedUser.toJSON();
    delete user.password;

    return {
      user,
      token
    };
  };
};