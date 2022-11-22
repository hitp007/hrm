import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  num: string;

  @Expose()
  altnum: string;

  @Expose()
  designation: string;

  @Expose()
  joindate: Date;

  @Expose()
  birthdate: Date;

  @Expose()
  ifsc: string;
}
