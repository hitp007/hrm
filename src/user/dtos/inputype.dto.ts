import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class InputUserType {
  @Field()
  email: string;

  @Field()
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
}
