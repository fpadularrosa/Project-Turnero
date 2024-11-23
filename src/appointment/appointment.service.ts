import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Request, Response } from 'express';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(@Res() response: Response, @Req() request: Request) {
    const appointment = this.appointmentRepository.create({
      date: new Date(request.body.date),
      companyId: request.body.companyId,
    });
    await this.appointmentRepository.save(appointment);
    return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully created' });
  }

  async findAll(@Req() request: Request, @Res() response: Response) {
    const userId = request?.user?.['id'];

    let schedules;
    if (userId) {
      schedules = await this.appointmentRepository.find({ where: { userId } });
      return response.status(HttpStatus.OK).json({ message: 'Your appointments', Appointments: schedules });
    }
  }

  async findOne(id: string) {
    const finded = await this.appointmentRepository.findOne({ where: { id } });
    return finded;
  }

  async update(@Req() request: Request, @Res() response: Response, appointmentid: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { userId } = updateAppointmentDto;

    if(userId){
      await this.appointmentRepository.update(appointmentid, { userId, state: 'Confirmed' });
      return response.status(HttpStatus.OK).json({ message: 'Your appointment has been created.' });
    }
    return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully suspended.' });
  }

  async remove(@Res() response: Response, @Req() request: Request, id: string) {
    try {
      await this.appointmentRepository.delete(id);

      return response.status(HttpStatus.OK).json({ message: 'Appointment has been successfully deleted' });
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}
