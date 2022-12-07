import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class AttendanceOut {
  @Field({nullable:true})
  hours: number;

  @Field({nullable:true})
  minutes: number;
}