declare enum select {
    'half' = 0,
    'full' = 1
}
export declare class UpdateLeaveDto {
    subject: select;
    reason: string;
    start: Date;
    end: Date;
}
export {};
