import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: ['ceo', 'user'] , default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) { this.password = await hash(this.password, 10); next(); });