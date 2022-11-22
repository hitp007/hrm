import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auths.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { AttendanceService } from './attendance.service';

@UseGuards(JwtAuthGuard)
@Controller("attendance")
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  @Get("in")
  intime(@Req() req) {
    const id = req.user.id;
    return this.attendanceService.intime(id);
  }
  @Get("totalhours")
  totalhour(@Req() req) {
    const id = req.user.id;
    return this.attendanceService.totalhoursforuser(id);
  }
  @UseGuards(RolesGuard)
  @Get("admin/all")
  totalhourforAll() {
    return this.attendanceService.totalhoursforAll();
  }

  @Get("out")
  outtime(@Req() req) {
    const id = req.user.id;
    return this.attendanceService.outtime(id);
  }
}

// GET /attendance/in           ----->  In User will Add User In Time And Create Attendance Instance 
// GET /attendance/totalhours   ----->  Return LoggedIn users TotalHours
// GET /attendance/admin/all    ----->  Return All User working Hours
// GET /attendance/out          ----->  Out time and todaytime will be saved.

