import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LeaveModule } from './leave/leave.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './Interceptors/transform.interceptor';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserResolver } from './user/user.resolver';
const getErrorCode = require('./finderror');
// import { ServeStaticModule } from "@nestjs/serve-static";
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB, {
      connectionName: "users",
    }),
    MongooseModule.forRoot(process.env.DB, {
      connectionName: "leaves",
    }),
    MongooseModule.forRoot(process.env.DB, {
      connectionName: "attendances",
    }),
    MongooseModule.forRoot(process.env.DB, {
      connectionName: "tokens",
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      introspection: true,
      formatError: (err) => {
        const error = getErrorCode(err.extensions.code);
        return { message: error.message, statusCode: error.statusCode };
      },
    }),
    UserModule,
    LeaveModule,
    AttendanceModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./src/config/.env.dev`],
      validationSchema: configValidationSchema,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    UserResolver,
  ],
})
export class AppModule {}
