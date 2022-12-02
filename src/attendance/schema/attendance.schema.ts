import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({timestamps:true})
export class Attendance {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  date:Date;

  @Prop()
  inTime: Date;

  @Prop()
  outTime: Date;

  @Prop()
  todaytime:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner:mongoose.Schema.Types.ObjectId
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
