import { Expose } from "class-transformer";


export class LeaveDto {
  @Expose()
  subject: string;

  @Expose()
  reason: string;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  admin:string;
}
