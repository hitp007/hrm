import { IsEmail, IsString } from 'class-validator';

enum select {
  'half',
  'full',
}
export class CreateLeaveDto {
  subject: select;

  @IsString()
  reason: string;

  start: Date;

  end: Date;

  @IsEmail()
  admin: string;

  owner: any;
}
