import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('admin')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard())
export class AdminController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: mongoose.Schema.Types.ObjectId): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() userDataDto: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userDataDto);
  }

  @Delete('/:id')
  deleteUserById(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ): Promise<void> {
    const ret = this.userService.deleteUserById(id);
    return ret;
  }
}


// Here All Routes Are For Admin

//Get    /admin           -----> Get All User.
//Get    /admin/:id       -----> Get User By Id.
//POST   /admin           -----> Create User.
//PATCH  /admin/:id       -----> Update User By Its Id.
//DELETE /admin/:id       -----> Delete User By Its Id.
