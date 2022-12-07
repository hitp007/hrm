import { Field, ObjectType } from "@nestjs/graphql";
import { AttendanceOut } from "./outtype";

@ObjectType()
export class AttendanceOutforAll {
  @Field({ nullable: true })
  user: string;

  @Field({ nullable: true })
  totaltime: AttendanceOut;
}
