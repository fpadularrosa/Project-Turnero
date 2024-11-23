import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companys/entities/company.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConstants from '../auth/jwt.constants';
import { CheckRoleMiddleware } from './middleware/checkrole.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, Company]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtService]
})

export class AppointmentModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckRoleMiddleware)
      .exclude({ path: 'appointment', method: RequestMethod.GET })
      .forRoutes(AppointmentController);
  }
};
