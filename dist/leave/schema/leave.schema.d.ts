import mongoose, { Document } from 'mongoose';
export declare type LeaveDocument = Leave & Document;
declare enum select {
    'half' = 0,
    'full' = 1
}
export declare class Leave {
    subject: select;
    reason: string;
    start: Date;
    end: Date;
    admin: string;
    approve: boolean;
    owner: mongoose.Schema.Types.ObjectId;
}
export declare const LeaveSchema: mongoose.Schema<Leave, mongoose.Model<Leave, any, any, any, any>, {}, {}, {}, {}, "type", Leave>;
export {};
