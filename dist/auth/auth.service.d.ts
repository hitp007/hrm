import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
export declare class AuthService {
    private userService;
    private jwtservice;
    jwtService: any;
    constructor(userService: UserService, jwtservice: JwtService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
        user: User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
}
