import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LeaveDocument = Leave & Document;
@ObjectType()

@Schema()
export class Leave {
  @Field()
  @Prop({ required: true })
  subject: string;

  @Field()
  @Prop({ required: true })
  reason: string;

  @Field()
  @Prop({ required: true })
  start: Date;

  @Field()
  @Prop({ required: true })
  end: Date;

  @Field()
  @Prop({ required: true })
  admin: string;

  @Field({ nullable: true })
  @Prop()
  approve: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: mongoose.Schema.Types.ObjectId;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
