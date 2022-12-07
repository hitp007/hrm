import { Field,InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UserUpdateDto {
  
   @Field({ nullable: true })
   @IsOptional()
  password: string;

   @Field({ nullable: true })
   @IsOptional()
  name: string;

   @Field({ nullable: true })
   @IsOptional()
  address: string;

   @Field({ nullable: true })
   @IsOptional()
  num: string;

   @Field({ nullable: true })
   @IsOptional()
  altnum: string;

   @Field({ nullable: true })
   @IsOptional()
  designation: string;

   @Field({ nullable: true })
   @IsOptional()
  joindate: Date;

   @Field({ nullable: true })
   @IsOptional()
  birthdate: Date;

   @Field({ nullable: true })
   @IsOptional()
  ifsc: string;

}
