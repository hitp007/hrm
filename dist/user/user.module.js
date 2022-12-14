"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const user_schema_1 = require("./schema/user.schema");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const user_controller_1 = require("./user.controller");
const admin_controller_1 = require("./admin.controller");
const token_schema_1 = require("./schema/token.schema");
const user_resolver_1 = require("./user.resolver");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }], "users"),
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }], "tokens"),
        ],
        controllers: [user_controller_1.UserController, admin_controller_1.AdminController],
        providers: [user_service_1.UserService, jwt_1.JwtService, auth_service_1.AuthService, user_resolver_1.UserResolver],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map