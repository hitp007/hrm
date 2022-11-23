import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
        user: User;
    }>;
    signup(createUserDto: CreateUserDto): Promise<User>;
}
