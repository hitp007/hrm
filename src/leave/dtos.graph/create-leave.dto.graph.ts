import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LeaveInput {
  @Field()
  subject: string;

  @Field()
  reason: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  admin: string;

  @Field()
  owner: string;
}
