import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Company, CompanySchema } from 'src/companys/schema/companys.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConstants from '../auth/jwt.constants';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { CheckRoleMiddleware } from './middleware/checkrole.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema
      }
    ]),
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
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtService, JwtStrategy]
})

export class AppointmentModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckRoleMiddleware)
      .exclude({ path: 'appointment', method: RequestMethod.GET })
      .forRoutes(AppointmentController);
  }
};
