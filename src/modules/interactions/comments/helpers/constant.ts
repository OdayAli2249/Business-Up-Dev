export abstract class CommentIncludes {
    public static readonly USER: string = 'USER';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDER';
    public static readonly POST: string = 'POST';
    public static readonly SERVICE: string = 'SERVICE';
    public static readonly REPLIES: string = 'REPLIES';
}

export abstract class CommentValidationErrors {
    public static readonly COMMENT_CREATION_BLOCK: string = 'COMMENT_CREATION_BLOCK';
    public static readonly CAN_NOT_UPDATE_COMMMENT: string = 'CAN_NOT_UPDATE_COMMMENT';
    public static readonly CAN_NOT_DELETE_COMMENT: string = 'CAN_NOT_DELETE_COMMENT';
    public static readonly COMMENT_DISPLAY_BLOCK: string = 'COMMENT_DISPLAY_BLOCK';
}

export abstract class CommentValidationCases {
    public static readonly NO_COMMENT_CREATION_BLOCK: string = 'NO_COMMENT_CREATION_BLOCK';
    public static readonly CAN_UPDATE_COMMENT: string = 'CAN_UPDATE_COMMENT';
    public static readonly CAN_DELETE_COMMENT: string = 'CAN_DELETE_COMMENT';
    public static readonly NO_COMMENT_DISPLAY_BLOCK: string = 'NO_COMMENT_DISPLAY_BLOCK';
}

export abstract class CommentErrorMessages {
    public static readonly COMMENT_CREATION_BLOCK: string = 'you can not comment in this resource.';
    public static readonly CAN_NOT_UPDATE_COMMMENT: string = 'you con not update this comment.';
    public static readonly CAN_NOT_DELETE_COMMENT: string = 'you con not delete this comment.';
    public static readonly COMMENT_DISPLAY_BLOCK: string = 'you con not display this comments.';
}