import { IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
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
}
