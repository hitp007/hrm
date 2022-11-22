declare enum select {
    "half" = 0,
    "full" = 1
}
export declare class LeaveDto {
    subject: select;
    reason: string;
    start: Date;
    end: Date;
    admin: string;
}
export {};
