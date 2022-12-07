import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeaveRequestDto } from './dtos/leave-request.dto';
import { UpdateLeaveDto } from './dtos/update-leave.dto';
import { Leave, LeaveDocument } from './schema/leave.schema';
export declare class LeaveService {
    private leaveModel;
    private userService;
    constructor(leaveModel: Model<LeaveDocument>, userService: UserService);
    allleave(): Promise<Leave[]>;
    findleave(id: string): Promise<Leave[]>;
    applyleave(adminx: string, owner: mongoose.Schema.Types.ObjectId, createleave: CreateLeaveDto): Promise<Leave>;
    checkleap(year: number): boolean;
    getleavedays(start: Date, end: Date): number;
    approveleave(leaverequest: LeaveRequestDto): Promise<Leave & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateleave(owner: boolean, userid: string, leaveid: string, editdata: UpdateLeaveDto): Promise<Leave>;
    deleteleave(userid: string, leaveid: string): Promise<string>;
}
