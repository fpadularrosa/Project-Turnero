import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('appointments')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('new')
  create(@Res() response: Response, @Req() request: Request, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(response, request, createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    return this.appointmentService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Res() response: Response, @Req() request: Request, @Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(request, response, id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Res() response: Response, @Req() request: Request, @Param('id') id: string) {
    return this.appointmentService.remove(response, request, id);
  }
}
