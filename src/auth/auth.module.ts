import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanyRepository } from '../companys/company.repository';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';

@Module({
  providers: [],
  exports: [],
})
export class AuthModule {}
