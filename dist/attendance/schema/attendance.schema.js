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
exports.AttendanceSchema = exports.Attendance = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Attendance = class Attendance {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Attendance.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Attendance.prototype, "inTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Attendance.prototype, "outTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Attendance.prototype, "todaytime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Attendance.prototype, "owner", void 0);
Attendance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({ timestamps: true })
], Attendance);
exports.Attendance = Attendance;
exports.AttendanceSchema = mongoose_1.SchemaFactory.createForClass(Attendance);
//# sourceMappingURL=attendance.schema.js.map