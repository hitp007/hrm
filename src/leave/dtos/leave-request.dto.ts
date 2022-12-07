import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LeaveRequestDto {
  @Field()
  approve: boolean;
  @Field()
  id: string;
}
