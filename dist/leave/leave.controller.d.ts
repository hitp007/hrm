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
    applyleave(req: any, res: any, body: CreateLeaveDto): any;
    approveleave(body: LeaveRequestDto): Promise<void>;
    updateleave(req: any, id: mongoose.Schema.Types.ObjectId, editdata: UpdateLeaveDto): void;
    deleteleave(req: any, id: mongoose.Schema.Types.ObjectId): void;
}
