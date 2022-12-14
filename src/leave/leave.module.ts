import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { LeaveController } from './leave.controller';
import { LeaveResolver } from './leave.resolver';
import { LeaveService } from './leave.service';
import { Leave, LeaveSchema } from './schema/leave.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Leave.name, schema: LeaveSchema }],
      'leaves',
    ),
    UserModule,
  ],
  controllers: [LeaveController],
  providers: [LeaveService,LeaveResolver],
})
export class LeaveModule {}
