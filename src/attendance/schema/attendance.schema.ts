import { Field, ObjectType } from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Attendance {
  _id: mongoose.Schema.Types.ObjectId;

  @Field()
  @Prop()
  date: Date;

  @Field()
  @Prop()
  inTime: Date;

  @Field({ nullable: true })
  @Prop()
  outTime: Date;

  @Field({ nullable: true })
  @Prop()
  todaytime: number;

  // @Field({ nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: mongoose.Schema.Types.ObjectId;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
