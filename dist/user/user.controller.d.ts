import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    entermail(body: any): void;
    sendmail(userid: any, token: any, body: any): Promise<string>;
}
