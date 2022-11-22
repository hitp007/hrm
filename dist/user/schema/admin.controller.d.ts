import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, userDataDto: UserUpdateDto): Promise<User>;
    deleteUserById(id: string): Promise<void>;
}
