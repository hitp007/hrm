"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const leave_controller_1 = require("./leave.controller");
const leave_service_1 = require("./leave.service");
const leave_schema_1 = require("./schema/leave.schema");
let LeaveModule = class LeaveModule {
};
LeaveModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: leave_schema_1.Leave.name, schema: leave_schema_1.LeaveSchema }], 'leaves'),
            user_module_1.UserModule,
        ],
        controllers: [leave_controller_1.LeaveController],
        providers: [leave_service_1.LeaveService],
    })
], LeaveModule);
exports.LeaveModule = LeaveModule;
//# sourceMappingURL=leave.module.js.map