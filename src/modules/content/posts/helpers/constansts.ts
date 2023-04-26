export abstract class PostIncludes {
    public static readonly REACTIONS: string = 'REACTIONS';
    public static readonly COMMENTS: string = 'COMMENTS';
    public static readonly BRANCH: string = 'BRANCH';
}

export abstract class PostValidationErrors {
    public static readonly DISPLAY_POSTS_BLOCKED: string = 'DISPLAY_POSTS_BLOCKED';
    public static readonly TEMPORARY_POST_UPDATE_DENY: string = 'TEMPORARY_POST_UPDATE_DENY';
    public static readonly TEMPORARY_POST_CREATE_DENY: string = 'TEMPORARY_POST_CREATE_DENY';
    public static readonly TEMPORARY_POST_DELETE_DENY: string = 'TEMPORARY_POST_DELETE_DENY';
}

export abstract class PostValidationCases {
    public static readonly CAN_DISPLAY_POSTS: string = 'CAN_DISPLAY_POSTS';
    public static readonly NO_TEMPORARY_POST_UPDATE_DENY: string = 'NO_TEMPORARY_POST_UPDATE_DENY';
    public static readonly NO_TEMPORARY_POST_CREATE_DENY: string = 'NO_TEMPORARY_POST_CREATE_DENY';
    public static readonly NO_TEMPORARY_POST_DELETE_DENY: string = 'NO_TEMPORARY_POST_DELETE_DENY';
}

export abstract class PostErrorMessages {
    public static readonly DISPLAY_POSTS_BLOCKED: string = 'display posts is blocked.';
    public static readonly TEMPORARY_POST_UPDATE_DENY: string = 'update post is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_POST_CREATE_DENY: string = 'create post is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_POST_DELETE_DENY: string = 'delete post is denied, check your provider permissions or try in another time.';
}