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
import { upperDirectiveTransformer } from './upper-case.directive';
import { join } from 'path';
import { UserResolver } from './user/user.resolver';
// import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://hit:admin@cluster0.1om8ufm.mongodb.net/test`,
      {
        connectionName: "users",
      }
    ),
    MongooseModule.forRoot(
      "mongodb+srv://hit:admin@cluster0.1om8ufm.mongodb.net/test",
      {
        connectionName: "leaves",
      }
    ),
    MongooseModule.forRoot(
      "mongodb+srv://hit:admin@cluster0.1om8ufm.mongodb.net/test",
      {
        connectionName: "attendances",
      }
    ),
    MongooseModule.forRoot(
      "mongodb+srv://hit:admin@cluster0.1om8ufm.mongodb.net/test",
      {
        connectionName: "tokens",
      }
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "client"),
    // }),
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    UserResolver,
  ],
})
export class AppModule {}
