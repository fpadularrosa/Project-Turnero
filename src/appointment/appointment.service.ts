import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Model } from 'mongoose';
import { Appointment } from './schema/appointment.schema';
import { Request, Response } from 'express';
import { Company, CompanyDocument } from 'src/companys/schema/companys.schema';
@Injectable()
export class AppointmentService {
  constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<UserDocument>,
  @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument> ){}

  async create(@Res() response: Response, @Req() request: Request, createAppointmentDto: CreateAppointmentDto) {
    const store = request.sessionStore;
    const sessionValues = Object.entries(store)[3];
    const {userId} = JSON.parse((Object.values(sessionValues[1])[0]).toString());
    const userSession = await this.userModel.findById(userId);
    const { nameCompany, date, month, year, time, available } = createAppointmentDto;
    const newAppointment = await this.appointmentModel.create({ date, month, year, time, available, userId });
    const companyWithAppointment = await this.companyModel.findOne({ name: nameCompany });
    companyWithAppointment?.appointments?.push(newAppointment);
    companyWithAppointment.save();
    userSession?.appointments?.push(newAppointment);
    userSession?.save();
    return response
    .status(HttpStatus.OK).json({
      message: 'Appointment has been successfully created',
      newAppointment
    });
  };

  async findAll(@Req() request: Request) {
    const { appointments } = await this.companyModel.findById(request.user['userId']);
    return appointments;
  };

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  };

  async update(@Req() request: Request, @Res() response: Response, id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const companyId = request.user['userId'];
    const existsCompany = await this.companyModel.findById(companyId);
    if(existsCompany){
      const appointmentUpdated = await this.appointmentModel.findByIdAndUpdate(id, updateAppointmentDto, { new: true });
      const appointmentsOfCompanyFiltered = existsCompany.appointments.filter(appointment => JSON.stringify(appointment['_id']) !== JSON.stringify(id)).push(appointmentUpdated);
      await this.companyModel.findByIdAndUpdate(companyId, { appointments: appointmentsOfCompanyFiltered });
      return response
      .status(HttpStatus.OK).json({
        message: 'Appointment has been successfully updated',
        appointmentUpdated
      });
    } else response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'You dont have authorization'
    });
  };

  async remove(@Res() response: Response, @Req() request: Request, id: string) {
    const companyId = request.user['userId'];
    const companySession = await this.companyModel.findById(companyId);
    if(companySession){
      const appointmentDeleted = await this.appointmentModel.findByIdAndDelete(id);
      const appointmentsFiltered = companySession.appointments.filter(appointment => JSON.stringify(appointment['_id']) !== JSON.stringify(id));
      await this.companyModel.findByIdAndUpdate(companyId, { appointments: appointmentsFiltered })
      return response
      .status(HttpStatus.OK).json({
        message: 'Appointment has been successfully deleted',
        appointmentDeleted
      });
    } else response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'You dont have authorization'
    });
  };
}
