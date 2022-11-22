import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true ,default:Date.now , expires:3600})
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
