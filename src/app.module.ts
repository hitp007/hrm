import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LeaveModule } from './leave/leave.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/hrm", {
      connectionName: "users",
    }),
    MongooseModule.forRoot("mongodb://localhost/hrm", {
      connectionName: "leaves",
    }),
    MongooseModule.forRoot("mongodb://localhost/hrm", {
      connectionName: "attendances",
    }),
    MongooseModule.forRoot("mongodb://localhost/hrm", {
      connectionName: "tokens",
    }),

    UserModule,
    LeaveModule,
    AttendanceModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./src/config/.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
