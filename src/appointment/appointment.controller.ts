import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppointmentService } from './appointment.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('appointments')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {};

  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  create(@Res() response: Response, @Req() request: Request) {
    return this.appointmentService.create(response, request);
  };

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() request: Request, @Res() response: Response) {
    return this.appointmentService.findAll(request, response);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  };

  @UseGuards(AuthGuard('jwt'))
  @Patch(':appointmentid')
  update(@Res() response: Response, @Req() request: Request, @Param('appointmentid') appointmentid: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(request, response, appointmentid, updateAppointmentDto);
  };

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Res() response: Response, @Req() request: Request, @Param('id') id: string) {
    return this.appointmentService.remove(response, request, id);
  };
};