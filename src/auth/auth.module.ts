import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Company, CompanySchema } from '../companys/schema/companys.schema';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { PassportModule } from '@nestjs/passport';

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
    AppointmentModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService
  ]
})
export class AuthModule {

}
