import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Company, CompanySchema } from 'src/companys/schema/companys.schema';

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
],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
