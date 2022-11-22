import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    intime(req: any): Promise<import("./schema/attendance.schema").Attendance>;
    totalhour(req: any): Promise<{
        hours: number;
        minutes: number;
    }>;
    totalhourforAll(): Promise<any[]>;
    outtime(req: any): Promise<void>;
}
