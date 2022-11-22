import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(
    private userService: UserService,
    private jwtservice: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessMessage: string }> {
    const email: string = authCredentialsDto.email;
    const user: any = await this.userService.find(email);
   //we are compaaring password.
   const isMatch = await bcrypt.compare(authCredentialsDto.password, user.password);
   // user not found and password is not match.
   if (!user || !isMatch) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
    const typeid = user._id;
    const payload = { email, typeid };
    const accessMessage: string = this.jwtservice.sign(payload);
    return { accessMessage };
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
