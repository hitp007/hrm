import { IsOptional, IsString } from 'class-validator';

enum select {
  'half',
  'full',
}
export class UpdateLeaveDto {
  @IsOptional()
  subject: select;

  @IsOptional()
  @IsString()
  reason: string;

  @IsOptional()
  start: Date;

  @IsOptional()
  end: Date;
}
