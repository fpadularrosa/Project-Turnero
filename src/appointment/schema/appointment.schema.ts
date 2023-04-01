import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { State } from '../enums/schema.enum';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: false })
  userId: string;

  @Prop({ enum: ['Suspended', 'Confirmed', 'Free'], default: 'Free' })
  state: State;
};

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);