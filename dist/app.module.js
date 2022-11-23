"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const leave_module_1 = require("./leave/leave.module");
const attendance_module_1 = require("./attendance/attendance.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const config_schema_1 = require("./config/config.schema");
const core_1 = require("@nestjs/core");
const transform_interceptor_1 = require("./Interceptors/transform.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/hrm", {
                connectionName: "users",
            }),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/hrm", {
                connectionName: "leaves",
            }),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/hrm", {
                connectionName: "attendances",
            }),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/hrm", {
                connectionName: "tokens",
            }),
            user_module_1.UserModule,
            leave_module_1.LeaveModule,
            attendance_module_1.AttendanceModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`./src/config/.env.${process.env.STAGE}`],
                validationSchema: config_schema_1.configValidationSchema,
                cache: true,
            }),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map