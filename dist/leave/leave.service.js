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
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const leave_schema_1 = require("./schema/leave.schema");
let LeaveService = class LeaveService {
    constructor(leaveModel, userService) {
        this.leaveModel = leaveModel;
        this.userService = userService;
    }
    async allleave() {
        const leaves = await this.leaveModel.find();
        return leaves;
    }
    async findleave(id) {
        const leaves = await this.leaveModel.find({ owner: id });
        return leaves;
    }
    async applyleave(owner, createleave) {
        const admin = createleave.admin;
        if (!this.userService.checkadmin(admin)) {
            throw new common_1.HttpException('Please enter Valid Admin', common_1.HttpStatus.BAD_REQUEST);
        }
        if (createleave.start > createleave.end) {
            throw new common_1.HttpException('End Date Can not be Before Start', common_1.HttpStatus.BAD_REQUEST);
        }
        const newleave = new this.leaveModel(createleave);
        newleave.owner = owner;
        await newleave.save();
        return newleave;
    }
    checkleap(year) {
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
            return true;
        }
        return false;
    }
    getleavedays(start, end) {
        let leap = this.checkleap(start.getFullYear()) ? 29 : 28;
        let months = [31, leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let daysCount = 0;
        while (start <= end) {
            let day = start.getDay();
            if (!(day == 0 || day == 6)) {
                daysCount++;
            }
            let date = start.getDate();
            let month = start.getMonth();
            if (months[month] == date) {
                date = 1;
                start.setDate(date);
                start.setMonth(start.getMonth() + 1);
                if (month == 11) {
                    start.setFullYear(start.getFullYear() + 1);
                    leap = this.checkleap(start.getFullYear()) ? 29 : 28;
                }
            }
            else {
                date++;
                start.setDate(date);
            }
        }
        return daysCount;
    }
    async approveleave(leaverequest) {
        const leave = await this.leaveModel.findById(leaverequest.id);
        if (!leaverequest.approve) {
            leave.approve = false;
        }
        else {
            if (!leave.approve) {
                leave.approve = true;
                const user = await this.userService.getUserById(leave.owner);
                let daysleave = this.getleavedays(leave.start, leave.end);
                if (leave.subject == 0) {
                    daysleave = daysleave / 2;
                }
                user.availeave = user.availeave - daysleave;
                user.usedleave = user.usedleave + daysleave;
                await leave.save();
            }
        }
    }
    async updateleave(userid, leaveid, editdata) {
        const leave = await this.leaveModel.findById(leaveid);
        if (userid.toString() !== leave.owner.toString()) {
            throw new common_1.HttpException('User Dont Have Access To Edit for this Leave', common_1.HttpStatus.BAD_REQUEST);
        }
        Object.assign(leave, editdata);
        await leave.save();
        return leave;
    }
    async deleteleave(userid, leaveid) {
        const leave = await this.leaveModel.findById(leaveid);
        if (userid.toString() !== leave.owner.toString()) {
            throw new common_1.HttpException('User Dont Have Access To Edit for this Leave', common_1.HttpStatus.BAD_REQUEST);
        }
        await leave.remove();
    }
};
LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_schema_1.Leave.name, 'leaves')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], LeaveService);
exports.LeaveService = LeaveService;
//# sourceMappingURL=leave.service.js.map