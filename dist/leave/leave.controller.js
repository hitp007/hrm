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
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const jwt_auths_guards_1 = require("../auth/gaurds/jwt-auths.guards");
const role_guard_1 = require("../guards/role.guard");
const serialize_interceptors_1 = require("../Interceptors/serialize.interceptors");
const create_leave_dto_1 = require("./dtos/create-leave.dto");
const leave_request_dto_1 = require("./dtos/leave-request.dto");
const leave_dto_1 = require("./dtos/leave.dto");
const update_leave_dto_1 = require("./dtos/update-leave.dto");
const leave_service_1 = require("./leave.service");
let LeaveController = class LeaveController {
    constructor(leaveService) {
        this.leaveService = leaveService;
    }
    findLeaveAll() {
        return this.leaveService.allleave();
    }
    findLeaveForUser(req) {
        return this.leaveService.findleave(req.user.id);
    }
    applyleave(req, body) {
        return this.leaveService.applyleave(req.user.id, body);
    }
    approveleave(body) {
        return this.leaveService.approveleave(body);
    }
    updateleave(req, id, editdata) {
        this.leaveService.updateleave(req.user.id, id, editdata);
    }
    deleteleave(req, id) {
        this.leaveService.deleteleave(req.user.id, id);
    }
};
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "findLeaveAll", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "findLeaveForUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_leave_dto_1.CreateLeaveDto]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "applyleave", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Post)('approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_request_dto_1.LeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "approveleave", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.default.Schema.Types.ObjectId, update_leave_dto_1.UpdateLeaveDto]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "updateleave", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.default.Schema.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "deleteleave", null);
LeaveController = __decorate([
    (0, common_1.UseGuards)(jwt_auths_guards_1.JwtAuthGuard),
    (0, serialize_interceptors_1.Serialize)(leave_dto_1.LeaveDto),
    (0, common_1.Controller)('leave'),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
exports.LeaveController = LeaveController;
//# sourceMappingURL=leave.controller.js.map