import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';


export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true, unique: true })
  ceo: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  employees: number;

  @Prop({ minlength: 60, maxlength: 1000, required: false })
  aboutCompany: string;

  @Prop({ enum: ['ceo', 'user'], default: Role.Ceo })
  role: Role;

  @Prop({ required: true })
  timeAttention: string;

  @Prop({ required: true })
  focus: string;

  // @Prop({ required: true })
  // logo: string;
};

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.pre('save', async function(next) {
  this.password = await hash(this.password, 10);
  next();
});