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
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtservice) {
        this.userService = userService;
        this.jwtservice = jwtservice;
    }
    async signup(createUserDto) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
    async signin(authCredentialsDto) {
        const email = authCredentialsDto.email;
        const user = await this.userService.find(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Incorrect login credentials! Email");
        }
        const isMatch = await bcrypt.compare(authCredentialsDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Incorrect login credentials! Password');
        }
        const typeid = user._id;
        const payload = { email, typeid };
        const accessToken = this.jwtservice.sign(payload);
        return { accessToken, user };
    }
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        return {
            message: 'User information from google',
            user: req.user,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map