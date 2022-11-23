import mongoose, { Document } from 'mongoose';
export declare type LeaveDocument = Leave & Document;
export declare class Leave {
    subject: string;
    reason: string;
    start: Date;
    end: Date;
    admin: string;
    approve: boolean;
    owner: mongoose.Schema.Types.ObjectId;
}
export declare const LeaveSchema: mongoose.Schema<Leave, mongoose.Model<Leave, any, any, any, any>, {}, {}, {}, {}, "type", Leave>;
