"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("util");
const user_service_1 = require("./user.service");
const crypto_1 = require("crypto");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(userdata) {
        const user = await this.userService.find(userdata.email);
        if (user) {
            throw new common_1.BadRequestException('email Already Exist');
        }
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (await scrypt(userdata.password, salt, 32));
        const result = hash.toString('hex') + '.' + salt;
        userdata.password = result;
        return await this.userService.create(userdata);
    }
    async signin(email, password) {
        const user = await this.userService.find(email);
        if (!user) {
            throw new common_1.BadRequestException('email Does Not Exist');
        }
        const [hash, salt] = user.password.split('.');
        const hashnew = (await scrypt(password, salt, 32));
        if (hashnew.toString('hex') !== hash) {
            throw new common_1.NotFoundException('Wrong Password');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map