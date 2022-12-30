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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const role_guard_1 = require("../guards/role.guard");
const create_user_type_dto_1 = require("./dtos/create-user.type.dto");
const inputype_dto_1 = require("./dtos/inputype.dto");
const user_update_dto_1 = require("./dtos/user-update.dto");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async user(email) {
        const user = await this.userService.find(email);
        return user;
    }
    async userbyId(id, context) {
        const admin = context["req"]["user"]["admin"];
        const currid = context["req"]["user"]["id"];
        if (id === null || id === "") {
            id = currid;
        }
        if (currid.toString() === id || admin) {
            return this.userService.getUserById(id);
        }
        throw new common_1.HttpException("Unauthorized to access it", 403);
    }
    async createUser(input) {
        return this.userService.create(input);
    }
    async deleteUser(id, context) {
        const admin = context["req"]["user"]["admin"];
        const currid = context["req"]["user"]["id"];
        if (id === null || id === "") {
            id = currid;
        }
        if (currid.toString() === id || admin) {
            return this.userService.deleteUserById(id);
        }
        throw new common_1.HttpException("Unauthorized to access it", 403);
    }
    async updateUser(id, input, context) {
        const admin = context["req"]["user"]["admin"];
        const currid = context["req"]["user"]["id"];
        if (id === null || id === "") {
            id = currid;
        }
        if (currid.toString() === id || admin) {
            return this.userService.updateUser(id, input);
        }
        throw new common_1.HttpException("Unauthorized to access it", 403);
    }
    async getAllUsers() {
        throw new common_1.HttpException("Unauthorized to access it", 403);
    }
};
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, graphql_1.Mutation)((returns) => create_user_type_dto_1.UserType),
    __param(0, (0, graphql_1.Args)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, graphql_1.Mutation)((returns) => create_user_type_dto_1.UserType),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userbyId", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, graphql_1.Query)((returns) => create_user_type_dto_1.UserType),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputype_dto_1.InputUserType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => create_user_type_dto_1.UserType),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => create_user_type_dto_1.UserType),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Args)("input")),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_update_dto_1.UserUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => [create_user_type_dto_1.UserType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((of) => create_user_type_dto_1.UserType),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map