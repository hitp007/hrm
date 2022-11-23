import { IsEmail, IsString } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  subject: string;

  @IsString()
  reason: string;

  start: Date;

  end: Date;

  @IsEmail()
  admin: string;

  owner: any;
}
