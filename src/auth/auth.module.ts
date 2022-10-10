import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { Company, CompanySchema } from '../companys/schema/companys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Company.name,
      schema: CompanySchema
    }
  ]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3h' },
  }),
],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
