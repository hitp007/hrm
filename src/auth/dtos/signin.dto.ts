import { Exclude, Expose } from "class-transformer";



export class Temp {
  email: string;

  name: string;

  address: string;

  num: string;

  altnum: string;

  designation: string;

  joindate: Date;

  birthdate: Date;

  ifsc: string;
}


export class signInDto {
@Expose()
  accessToken: string;
@Expose()
  user: Temp;
}