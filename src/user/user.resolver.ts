import { HttpException, Req, UseGuards } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from 'src/guards/req.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserType } from './dtos/create-user.type.dto';
import { InputUserType } from './dtos/inputype.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserService } from './user.service';

@Resolver((of) => UserType)
// @UseGuards(AuthGuard())
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  @Mutation((returns) => UserType)
  async user(@Args("email") email: string) {
    const user = await this.userService.find(email);
    return user;
  }

  @UseGuards(RolesGuard)
  @Mutation((returns) => UserType)
  async userbyId(
    @Args("id") id: string,
    @Context() context: GraphQLExecutionContext
  ) {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    if (id === null || id === "") {
      id = currid;
    }
    if (currid.toString() === id || admin) {
      return this.userService.getUserById(id);
    }
    throw new HttpException("Unauthorized to access it", 403);
  }

  @UseGuards(RolesGuard)
  @Query((returns) => UserType)
  async createUser(@Args("input") input: InputUserType): Promise<UserType> {
    return this.userService.create(input);
  }

  @Query((returns) => UserType)
  async deleteUser(
    @Args("id") id: string,
    @Context() context: GraphQLExecutionContext
  ): Promise<string> {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    if (id === null || id === "") {
      id = currid;
    }
    if (currid.toString() === id || admin) {
      return this.userService.deleteUserById(id);
    }
    throw new HttpException("Unauthorized to access it", 403);
  }

  @Query((returns) => UserType)
  async updateUser(
    @Args("id") id: string,
    @Args("input") input: UserUpdateDto,
    @Context() context: GraphQLExecutionContext
  ) {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    if (id === null || id === "") {
      id = currid;
    }
    if (currid.toString() === id || admin) {
      return this.userService.updateUser(id, input);
    }
    throw new HttpException("Unauthorized to access it", 403);
  }

  @UseGuards(RolesGuard)
  @Query((returns) => [UserType])
  async getAllUsers() {
    return this.userService.findAll();
  }
}
