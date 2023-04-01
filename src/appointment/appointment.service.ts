import { HttpStatus, Injectable, Req, Res, UploadedFile } from '@nestjs/common';
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
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(@Res() response: Response, @Req() request: Request) {
    await this.appointmentModel.create({ date: new Date(request.body.date), companyId: request.body.companyId });
    return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully created' });
  };

  async findAll(@Req() request: Request, @Res() response: Response) {
    const user = await this.userModel.findById(request?.user?.['id']);
    const company = await this.companyModel.findById(request?.user?.['id']);

    let schedules;
    if (user) {
      schedules = await this.appointmentModel.find({ where: { userId: request?.user?.['id'] } });
      return response.status(HttpStatus.OK).json({ message: 'Your appointments', Appointments: schedules });
    }
    if (company) {
      schedules = await this.appointmentModel.find({ where: { companyId: request?.user?.['id'] } });
      return response.status(HttpStatus.OK).json({ message: 'Your appointments', Appointments: schedules });
    }
  };

  async findOne(id: string) {
    const finded = await this.appointmentModel.findById(id);
    return finded;
  };

  async update(@Req() request: Request, @Res() response: Response, appointmentid: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { state, userId } = updateAppointmentDto;

    if(userId){
      await this.appointmentModel.findByIdAndUpdate(appointmentid, { userId, state: 'Confirmed' }, { new: true });
      return response.status(HttpStatus.OK).json({ message: 'Your appointment has been created.' });
    };
    await this.appointmentModel.findByIdAndUpdate(appointmentid, { state }, { new: true });
    return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully suspended.' });
  };

  async remove(@Res() response: Response, @Req() request: Request, id: string) {
    try {
      await this.appointmentModel.findByIdAndDelete(id);

      return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully deleted' });
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
};
