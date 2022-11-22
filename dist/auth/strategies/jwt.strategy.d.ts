import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userservice;
    private configService;
    constructor(userservice: UserService, configService: ConfigService);
    validate(req: Request, payload: any): Promise<{
        admin: boolean;
        id: mongoose.Schema.Types.ObjectId;
    }>;
}
export {};
