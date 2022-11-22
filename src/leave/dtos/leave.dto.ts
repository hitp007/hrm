import { Expose } from "class-transformer";

enum select {
  "half",
  "full",
}
export class LeaveDto {
  @Expose()
  subject: select;

  @Expose()
  reason: string;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  admin:string;
}
