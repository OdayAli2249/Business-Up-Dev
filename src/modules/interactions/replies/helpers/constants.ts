export abstract class ReplyIncludes {
    public static readonly USER: string = 'USER';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDER';
}

export abstract class ReplyValidationErrors {
    public static readonly REPLY_CREATION_BLOCK: string = 'REPLY_CREATION_BLOCK';
    public static readonly CAN_NOT_UPDATE_REPLY: string = 'CAN_NOT_UPDATE_REPLY';
    public static readonly CAN_NOT_DELETE_REPLY: string = 'CAN_NOT_DELETE_REPLY';
    public static readonly REPLY_DISPLAY_BLOCK: string = 'REPLY_DISPLAY_BLOCK';
}

export abstract class ReplyValidationCases {
    public static readonly NO_REPLY_CREATION_BLOCK: string = 'NO_REPLY_CREATION_BLOCK';
    public static readonly CAN_UPDATE_REPLY: string = 'CAN_UPDATE_REPLY';
    public static readonly CAN_DELETE_REPLY: string = 'CAN_DELETE_REPLY';
    public static readonly NO_REPLY_DISPLAY_BLOCK: string = 'NO_REPLY_DISPLAY_BLOCK';
}

export abstract class ReplyErrorMessages {
    public static readonly REPLY_CREATION_BLOCK: string = 'you can not reply on this comment.';
    public static readonly CAN_NOT_UPDATE_REPLY: string = 'you can not update the reply on this comment.';
    public static readonly CAN_NOT_DELETE_REPLY: string = 'you can not delete the reply on this comment.';
    public static readonly REPLY_DISPLAY_BLOCK: string = 'ypu can not display replies on this comment.';
}