import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';
export declare class AttendanceService {
    private attendanceModel;
    constructor(attendanceModel: Model<AttendanceDocument>);
    intime(owner: string): Promise<Attendance>;
    totalhoursforuser(owner: string): Promise<{
        hours: number;
        minutes: number;
    }>;
    eachUserTimeById(attendances: any): {};
    totalhoursforAll(): Promise<any[]>;
    outtime(owner: string): Promise<void>;
    showinhourandminute(num: number): {
        hours: number;
        minutes: number;
    };
}
