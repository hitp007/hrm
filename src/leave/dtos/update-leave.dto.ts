import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

enum select {
  'half',
  'full',
}
@InputType()
export class UpdateLeaveDto {

  @Field()
  subject: select;

  @Field()
  reason: string;

  @Field()
  start: Date;

  @Field()
  end: Date;
}
