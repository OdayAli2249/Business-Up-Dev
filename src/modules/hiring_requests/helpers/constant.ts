export abstract class HiringRequestIncludes {
    public static readonly USER: string = 'USERS';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDERS';
}

export abstract class HiringRequestValidationErrors {
    public static readonly CAN_NOT_APPLY_FOR_HIRING_REQUEST: string = 'CAN_NOT_APPLY_FOR_HIRING_REQUEST';
    public static readonly NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED: string = 'NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED';
    public static readonly NOT_SENT: string = 'NOT_SENT';
    public static readonly NOT_PENDING: string = 'NOT_PENDING';
    public static readonly ALREADY_ACCEPTED_OR_REJECTED: string = 'ALREADY_ACCEPTED_OR_REJECTED';
}

export abstract class HiringRequestValidationCases {
    public static readonly CAN_USER_APPLY_FOR_HIRING_REQUEST: string = 'CAN_USER_APPLY_FOR_HIRING_REQUEST';
    public static readonly IS_REJECTED_OR_NOT_ALREADY_CREATED: string = 'IS_REJECTED_OR_NOT_ALREADY_CREATED';
    public static readonly IS_SENT: string = 'IS_SENT';
    public static readonly IS_PENDING: string = 'IS_PENDING';
    public static readonly NEITHER_ALREADY_ACCEPTED_NOR_REJECTED: string = 'NEITHER_ALREADY_ACCEPTED_NOR_REJECTED';
}

export abstract class HiringRequestErrorMessages {
    public static readonly CAN_NOT_APPLY_FOR_HIRING_REQUEST: string = 'you can not apply for hiring request, this may happen if you have been rejected more than once. application for this job may open later or may keep closed forever.';
    public static readonly NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED: string = 'you can not send this application. you may be already hired or already have sent request.';
    public static readonly NOT_PENDING: string = 'this request can not be canceled neither rejected inless it is pending.';
}