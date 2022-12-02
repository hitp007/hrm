import { UserType } from './dtos/create-user.type.dto';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    users(): Promise<UserType[]>;
}
