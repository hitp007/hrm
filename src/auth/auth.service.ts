import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { Serialize } from 'src/Interceptors/serialize.interceptors';
import { signInDto } from './dtos/signin.dto';
@Injectable()
export class AuthService {
  jwtService: any;
  constructor(
    private userService: UserService,
    private jwtservice: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user= await this.userService.create(createUserDto);
    return user;
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ) {
    const email = authCredentialsDto.email;
    const user= await this.userService.find(email);
    if(!user){
       throw new UnauthorizedException("Incorrect login credentials! Email");
    }
   //we are compaaring password.
   const isMatch = await bcrypt.compare(authCredentialsDto.password, user.password);
   // user not found and password is not match.
   if (!isMatch) {
      throw new UnauthorizedException('Incorrect login credentials! Password');
    }
    const typeid = user._id;
    const payload = { email, typeid };
    const accessToken: string = this.jwtservice.sign(payload);
    return { accessToken, user};
  }

  //created for testing login functionality using gmail
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
