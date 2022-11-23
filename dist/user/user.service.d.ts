import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { TokenDocument } from './schema/token.schema';
export declare class UserService {
    private userModel;
    private tokenModel;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    find(email: string): Promise<User>;
    getUserById(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    updateUser(id: mongoose.Schema.Types.ObjectId, updateUser: UserUpdateDto): Promise<User>;
    deleteUserById(id: mongoose.Schema.Types.ObjectId): Promise<void>;
    checkadmin(email: string): Promise<boolean>;
    entermail(email: string): Promise<void>;
    sendmail(email: string, link: string): Promise<void>;
    formatEmail(link: string): string;
    forgetpassword(userid: string, token: string, password: string): Promise<string>;
}
