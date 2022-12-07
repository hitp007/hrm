import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userservice: UserService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload,
  ): Promise<{ admin: boolean; id: mongoose.Schema.Types.ObjectId }> {
    //  console.log("JWt Run",payload);
    const { email, typeid } = payload;
    const user = await this.userservice.find(email);
  
    if (!user) {
      throw new UnauthorizedException();
    }
  // console.log("user", user);
    return { admin: user.admin, id: user._id };
  }
}
