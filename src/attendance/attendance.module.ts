import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance, AttendanceSchema } from './schema/attendance.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceResolver } from './attendance.resolver';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Attendance.name, schema: AttendanceSchema }],
      "attendances"
    ),
  ],
  providers: [AttendanceService, AttendanceResolver],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
