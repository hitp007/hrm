import mongoose from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
export declare class AdminController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    getUserById(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: mongoose.Schema.Types.ObjectId, userDataDto: UserUpdateDto): Promise<User>;
    deleteUserById(id: mongoose.Schema.Types.ObjectId): Promise<void>;
}
