import mongoose, { Document } from 'mongoose';
export declare type AttendanceDocument = Attendance & Document;
export declare class Attendance {
    _id: mongoose.Schema.Types.ObjectId;
    date: Date;
    inTime: Date;
    outTime: Date;
    todaytime: number;
    owner: mongoose.Schema.Types.ObjectId;
}
export declare const AttendanceSchema: mongoose.Schema<Attendance, mongoose.Model<Attendance, any, any, any, any>, {}, {}, {}, {}, "type", Attendance>;
