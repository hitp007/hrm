import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/Interceptors/serialize.interceptors';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Serialize(UserDto)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get("me")
  getUserById(@Req() request): Promise<User> {
    const id = request.user.id;
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard())
  @Patch("me")
  updateUser(
    @Req() request,
    @Body() userDataDto: UserUpdateDto
  ): Promise<User> {
    const id = request.user.id;
    return this.userService.updateUser(id, userDataDto);
  }

  @UseGuards(AuthGuard())
  @Delete("me")
  deleteUserById(@Req() request): Promise<void> {
    const id = request.user.id;
    return this.userService.deleteUserById(id);
    
  }

  @Post("enter-email")
  entermail(@Body() body) {
    this.userService.entermail(body.email);
  }

  @Post("/:userid/:token")
  sendmail(@Param('userid') userid,@Param('token') token,@Body() body) {
    return this.userService.forgetpassword(userid,token,body.password);
  }
}

// Routes For User.

//GET    /user/me               ----->  Get Current User.
//PATCH  /user/me               ----->  Update Detail Of Current LoggedIn User.
//DELETE /user/me               ----->  Delete User who is Logged In.
//POST   /user/enter-email      ----->  Send Link to user Given Email when User is Verified. 
//POST   /user/:userid/:token   ----->  Link where User can enter new Password.