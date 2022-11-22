/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    name: string;
    address: string;
    num: string;
    altnum: string;
    designation: string;
    joindate: Date;
    birthdate: Date;
    ifsc: string;
    profile: Buffer;
    createdAt: Date;
    ModifiedAt: Date;
    admin: boolean;
    availeave: number;
    usedleave: number;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
