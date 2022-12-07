import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import mongoose from "mongoose";

@ObjectType()
export class UserType {
  // @Field({ nullable: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  num: string;

  @Field({ nullable: true })
  altnum: string;

  @Field({ nullable: true })
  designation: string;

  @Field({ nullable: true })
  joindate: Date;

  @Field({ nullable: true })
  birthdate: Date;

  @Field({ nullable: true })
  ifsc: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  ModifiedAt: Date;

  @Field({ nullable: true })
  admin: boolean;
}
