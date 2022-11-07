import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  date: string;
  
  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  time: string;

  @Prop({ default: true })
  available: boolean;

  @Prop()
  userId: string;
};

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);