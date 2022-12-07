import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserUpdateDto } from './dtos/user-update.dto';
import { TokenDocument } from './schema/token.schema';
import { InputUserType } from './dtos/inputype.dto';
export declare class UserService {
    private userModel;
    private tokenModel;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>);
    create(createUserDto: InputUserType): Promise<User>;
    findAll(): Promise<User[]>;
    find(email: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, updateUser: UserUpdateDto): Promise<User>;
    deleteUserById(id: string): Promise<string>;
    checkadmin(email: string): Promise<boolean>;
    entermail(email: string): Promise<void>;
    sendmail(email: string, link: string): Promise<void>;
    formatEmail(link: string): string;
    forgetpassword(userid: string, token: string, password: string): Promise<string>;
}
