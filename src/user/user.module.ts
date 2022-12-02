import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema, User } from './schema/user.schema';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';
import { Token, TokenSchema } from './schema/token.schema';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      "users"
    ),
    MongooseModule.forFeature(
      [{ name: Token.name, schema: TokenSchema }],
      "tokens"
    ),
  ],
  controllers: [UserController, AdminController],
  providers: [UserService, JwtService, AuthService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
