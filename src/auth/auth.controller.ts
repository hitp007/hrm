import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/Interceptors/serialize.interceptors';
import { signInDto } from './dtos/signin.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Serialize(signInDto)
  @Post("auth/signin")
  signin(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signin(authCredentialsDto);
  }

  @Post("auth/signup")
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.authService.googleLogin(req);
  // }
}
// POST /auth/signin      ----->  Signin (email,password)
// POST /auth/signup      ----->  Signup (email,password) else is Optional