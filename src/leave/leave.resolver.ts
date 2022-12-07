import {  HttpException, UseGuards } from "@nestjs/common";
import { Query, Args, Mutation, Resolver, Context, GraphQLExecutionContext } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/guards/req.guard";
import { RolesGuard } from "src/guards/role.guard";
import { UserUpdateDto } from "src/user/dtos/user-update.dto";
import { LeaveInput } from "./dtos.graph/create-leave.dto.graph";
import { LeaveRequestDto } from "./dtos/leave-request.dto";
import { UpdateLeaveDto } from "./dtos/update-leave.dto";
import { LeaveService } from "./leave.service";
import { Leave } from "./schema/leave.schema";

@Resolver((of) => Leave)
@UseGuards(GqlAuthGuard)
export class LeaveResolver {
  constructor(private leaveservice: LeaveService) {}

  @Mutation((returns) => Leave)
  async applyleave(
    @Args("input") input: LeaveInput,
    @Context() context: GraphQLExecutionContext
  ) {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    return this.leaveservice.applyleave(admin, currid, input);
  }

  @Query((returns) => [Leave])
  async findLeaveAll(): Promise<Leave[]> {
    return this.leaveservice.allleave();
  }

  @Query((returns) => [Leave])
  async findLeaveforUser(
    @Args("id") id: string,
    @Context() context: GraphQLExecutionContext
  ): Promise<Leave[]> {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    if (id === null || id === "") {
      id = currid;
    }
    if (currid.toString() === id || admin) {
      return this.leaveservice.findleave(id);
    }
    throw new HttpException("Unauthorized to access it", 403);
  }

  @Query((returns) => Leave)
  async deleteleave(
    @Args("id") id: string,
    @Context() context: GraphQLExecutionContext
  ): Promise<string> {
    const currid = context["req"]["user"]["id"];
    const msg = this.leaveservice.deleteleave(currid, id);
    return msg;
  }

  @Query((returns) => Leave)
  async updateleave(
    @Context() context: GraphQLExecutionContext,
    @Args("id") id: string,
    @Args("input") input: UpdateLeaveDto
  ) {
    const admin = context["req"]["user"]["admin"];
    const currid = context["req"]["user"]["id"];
    return this.leaveservice.updateleave(admin, currid, id, input);
  }

  @UseGuards(RolesGuard)
  @Query((returns) => Leave)
  async approveleave(
    @Context() context: GraphQLExecutionContext,
    @Args("id") id: string,
    @Args("input") input: LeaveRequestDto
  ) {
    return this.leaveservice.approveleave(input);
  }
}
