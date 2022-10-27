import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TurnDocument = Turn & Document;

@Schema()
export class Turn {
  @Prop({ required: true })
  eventDate: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  service: string;
};

export const TurnSchema = SchemaFactory.createForClass(Turn);