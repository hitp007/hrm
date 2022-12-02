import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserType } from './dtos/create-user.type.dto';
import { InputUserType } from './dtos/inputype.dto';
import { UserService } from './user.service';

// @UseGuards(RolesGuard)
@UseGuards(AuthGuard())
@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [UserType])
  async users(): Promise<UserType[]> {
    return this.userService.findAll();
  }
  // @Mutation((returns) => [UserType])
  // async createUser(@Args("input") input: InputUserType): Promise<UserType> {
  //   return this.userService.create(input);
  // }
}


