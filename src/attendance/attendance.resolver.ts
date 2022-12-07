import { HttpException, Req, UseGuards } from "@nestjs/common";
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { GqlAuthGuard } from "src/guards/req.guard";
import { RolesGuard } from "src/guards/role.guard";
import { AttendanceService } from "./attendance.service";
import { AttendanceOut } from "./dtos/outtype";
import { AttendanceOutforAll } from "./dtos/outtypeforall";
import { Attendance } from "./schema/attendance.schema";

@Resolver((of) => Attendance)
// @UseGuards(AuthGuard())
@UseGuards(GqlAuthGuard)
export class AttendanceResolver {
  constructor(private attendanceService: AttendanceService) {}

  @Mutation((returns) => Attendance)
  async intime(@Context() context: GraphQLExecutionContext) {
    const id = context["req"]["user"]["id"];
    return this.attendanceService.intime(id);
  }

  @Mutation((returns) => Attendance)
  async outtime(@Context() context: GraphQLExecutionContext) {
    const id = context["req"]["user"]["id"];
    return this.attendanceService.outtime(id);
  }

  @Mutation((returns) => AttendanceOut)
  async totalhoursforuser(
    @Context() context: GraphQLExecutionContext
  ): Promise<{ hours: number; minutes: number }> {
    const id = context["req"]["user"]["id"];
    return this.attendanceService.totalhoursforuser(id);
  }

  @UseGuards(RolesGuard)
  @Mutation((returns) => [AttendanceOutforAll])
  async totalhoursforAll(@Context() context: GraphQLExecutionContext) {
    return this.attendanceService.totalhoursforAll();
  }
}
