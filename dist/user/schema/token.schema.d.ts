import mongoose, { Document } from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    _id: mongoose.Schema.Types.ObjectId;
    token: string;
    owner: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, "type", Token>;
