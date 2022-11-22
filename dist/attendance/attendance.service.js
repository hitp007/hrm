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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("./schema/attendance.schema");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel) {
        this.attendanceModel = attendanceModel;
    }
    async intime(owner) {
        const inTime = new Date(Date.now() + 19800000);
        const date = new Date(inTime.getFullYear(), inTime.getMonth(), inTime.getDate() + 1);
        const checkAlreadyInOrNot = await this.attendanceModel.findOne({ date, owner });
        if (checkAlreadyInOrNot) {
            throw new common_1.HttpException("Already In", common_1.HttpStatus.BAD_REQUEST);
        }
        const attendance = new this.attendanceModel({ date, inTime, owner });
        await attendance.save();
        return attendance;
    }
    async totalhoursforuser(owner) {
        const attendances = await this.attendanceModel.find({ owner });
        let time = 0;
        attendances.forEach((attendance) => {
            if (attendance.todaytime) {
                time += attendance.todaytime;
            }
        });
        return this.showinhourandminute(time);
    }
    eachUserTimeById(attendances) {
        const arr = {};
        attendances.forEach((attendance) => {
            if (attendance.todaytime) {
                if (!arr[attendance._id])
                    arr[attendance._id] = attendance.todaytime;
            }
            else {
                arr[attendance._id] += attendance.todaytime;
            }
        });
        return arr;
    }
    ;
    async totalhoursforAll() {
        const finalarr = [];
        const attendances = await this.attendanceModel.find();
        const eachUser = this.eachUserTimeById(attendances);
        for (const user in eachUser) {
            finalarr.push({
                user,
                totaltime: this.showinhourandminute(eachUser[user]),
            });
        }
        return finalarr;
    }
    async outtime(owner) {
        const outTime = new Date(Date.now() + 19800000);
        const date = new Date(outTime.getFullYear(), outTime.getMonth(), outTime.getDate() + 1);
        const attendance = await this.attendanceModel.findOne({ date, owner });
        if (attendance.outTime !== undefined) {
            throw new common_1.HttpException("Already Out", common_1.HttpStatus.BAD_REQUEST);
        }
        const inTime = attendance.inTime;
        const todaytime = outTime.getTime() - inTime.getTime();
        attendance.todaytime = todaytime;
        attendance.outTime = outTime;
        await attendance.save();
    }
    showinhourandminute(num) {
        const hours = Math.floor((num / (60 * 60 * 1000)) % (60 * 60 * 1000));
        const minutes = Math.floor((num / (60 * 1000)) % (60 * 1000));
        return { hours, minutes };
    }
};
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name, "attendances")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map