import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from "bcrypt";
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  num: string;

  @Prop()
  altnum: string;

  @Prop()
  designation: string;

  @Prop()
  joindate: Date;

  @Prop()
  birthdate: Date;

  @Prop()
  ifsc: string;

  @Prop()
  profile: Buffer;

  @Prop({default:Date.now})
  createdAt: Date;

  @Prop({default:Date.now})
  ModifiedAt: Date;

  @Prop({ default: true })
  admin: boolean;

  @Prop({ default: 0 })
  availeave: number;

  @Prop({ default: 0 })
  usedleave: number;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save',async function(next){
  if(this.isModified('password')){
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
  }
   this.ModifiedAt = new Date(Date.now() + 19800000);
  next();
})
