import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserById(request: any): Promise<User>;
    updateUser(request: any, userDataDto: UserUpdateDto): Promise<User>;
    deleteUserById(request: any): Promise<void>;
    entermail(body: any): void;
    sendmail(userid: any, token: any, body: any): Promise<string>;
}
