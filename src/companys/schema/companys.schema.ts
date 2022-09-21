import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ceo: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  employees: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);