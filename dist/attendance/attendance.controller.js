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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auths_guards_1 = require("../auth/gaurds/jwt-auths.guards");
const role_guard_1 = require("../guards/role.guard");
const attendance_service_1 = require("./attendance.service");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    intime(req) {
        const id = req.user.id;
        return this.attendanceService.intime(id);
    }
    totalhour(req) {
        const id = req.user.id;
        return this.attendanceService.totalhoursforuser(id);
    }
    totalhourforAll() {
        return this.attendanceService.totalhoursforAll();
    }
    outtime(req) {
        const id = req.user.id;
        return this.attendanceService.outtime(id);
    }
};
__decorate([
    (0, common_1.Get)("in"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "intime", null);
__decorate([
    (0, common_1.Get)("totalhours"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "totalhour", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)("admin/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "totalhourforAll", null);
__decorate([
    (0, common_1.Get)("out"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "outtime", null);
AttendanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auths_guards_1.JwtAuthGuard),
    (0, common_1.Controller)("attendance"),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
exports.AttendanceController = AttendanceController;
//# sourceMappingURL=attendance.controller.js.map