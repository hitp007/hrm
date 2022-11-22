import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signup(userdata: CreateUserDto): Promise<import("./schema/user.schema").User>;
    signin(email: string, password: string): Promise<import("./schema/user.schema").User>;
}
