import mongoose from 'mongoose';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeaveRequestDto } from './dtos/leave-request.dto';
import { UpdateLeaveDto } from './dtos/update-leave.dto';
import { LeaveService } from './leave.service';
export declare class LeaveController {
    private leaveService;
    constructor(leaveService: LeaveService);
    findLeaveAll(): Promise<import("./schema/leave.schema").Leave[]>;
    findLeaveForUser(req: any): Promise<import("./schema/leave.schema").Leave[]>;
    applyleave(req: any, body: CreateLeaveDto): Promise<import("./schema/leave.schema").Leave>;
    approveleave(body: LeaveRequestDto): Promise<import("./schema/leave.schema").Leave & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateleave(req: any, id: string, editdata: UpdateLeaveDto): Promise<import("./schema/leave.schema").Leave>;
    deleteleave(req: any, id: string): Promise<string>;
}
