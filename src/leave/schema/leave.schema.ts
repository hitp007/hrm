import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LeaveDocument = Leave & Document;
enum select {
  'half',
  'full',
}
@Schema()
export class Leave {
  @Prop({ required: true })
  subject: select;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  admin: string;

  @Prop()
  approve: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Schema.Types.ObjectId;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
