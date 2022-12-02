import { InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  num: string;

  @IsOptional()
  altnum: string;

  @IsOptional()
  designation: string;

  @IsOptional()
  joindate: Date;

  @IsOptional()
  birthdate: Date;

  @IsOptional()
  ifsc: string;

  @IsOptional()
  profile: Buffer;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  ModifiedAt: Date;
}
