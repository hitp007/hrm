import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auths.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Serialize } from 'src/Interceptors/serialize.interceptors';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeaveRequestDto } from './dtos/leave-request.dto';
import { LeaveDto } from './dtos/leave.dto';
import { UpdateLeaveDto } from './dtos/update-leave.dto';
import { LeaveService } from './leave.service';


@UseGuards(JwtAuthGuard)
@Serialize(LeaveDto)
@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @UseGuards(RolesGuard)
  @Get()
  findLeaveAll() {
    return this.leaveService.allleave();
  }

  @Get('me')
  findLeaveForUser(@Req() req) {
    return this.leaveService.findleave(req.user.id);
  }

  @Post()
  applyleave(@Req() req,@Res() res,@Body() body: CreateLeaveDto) {
    if(req.user.admin){
      return res.status(401).send("Admin Can Not Apply Leave.");
    }
    return this.leaveService.applyleave(req.user.id, body);
  }

  @UseGuards(RolesGuard)
  @Post('approve')
  approveleave(@Body() body: LeaveRequestDto) {
    return this.leaveService.approveleave(body);
  }

  @Patch(':id')
  updateleave(
    @Req() req,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() editdata: UpdateLeaveDto,
  ) {
    this.leaveService.updateleave(req.user.owner,req.user.id, id, editdata);
  }

  @Delete(':id')
  deleteleave(@Req() req, @Param('id') id: mongoose.Schema.Types.ObjectId) {
    this.leaveService.deleteleave(req.user.id, id);
  }
}

//  GET /leave            ----->   Get All Users works Only for Admin
//  GET /leave/me         ----->   Get Current User all applied leaves who has SignedIn 
//  POST /leave           ----->   Create Leave for SignedIn User
//  POST /leave/approve   ----->   Approve Leave works only for Admin
//  PATCH /leave/:id      ----->   Update Leave for SignedIn User
//  DELETE /leave/:id     ----->   Delete Leave for SignedIn User