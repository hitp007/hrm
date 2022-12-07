import mongoose from "mongoose";
export declare class UserType {
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
    createdAt: Date;
    ModifiedAt: Date;
    admin: boolean;
}
