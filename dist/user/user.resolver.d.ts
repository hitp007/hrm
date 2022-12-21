import { GraphQLExecutionContext } from '@nestjs/graphql';
import { UserType } from './dtos/create-user.type.dto';
import { InputUserType } from './dtos/inputype.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    user(email: string): Promise<import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    userbyId(id: string, context: GraphQLExecutionContext): Promise<import("./schema/user.schema").User>;
    createUser(input: InputUserType): Promise<UserType>;
    deleteUser(id: string, context: GraphQLExecutionContext): Promise<string>;
    updateUser(id: string, input: UserUpdateDto, context: GraphQLExecutionContext): Promise<import("./schema/user.schema").User>;
    getAllUsers(): Promise<void>;
}
