export abstract class UserIncludes {
    public static readonly COMMENTS: string = 'COMMENTS';
    public static readonly REACTIONS: string = 'REACTIONS';
    public static readonly REPLIES: string = 'REPLIES';
    public static readonly ORDERS: string = 'ORDERS';
    public static readonly SUBSCRIBTIONS: string = 'SUBSCRIBTIONS';
    public static readonly BRANCHES: string = 'BRANCHES';
    public static readonly ROLES: string = 'ROLES';
}

export abstract class UserRoleIncludes {
    public static readonly USER: string = 'USER';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDER';
}

export abstract class UserValidationErrors {
    public static readonly UPDATE_PROFILE_TIME_STAMP_NOT_AUTHORIZED: string = 'UPDATE_PROFILE_TIME_STAMP_NOT_AUTHORIZED';
}

export abstract class UserValidationCases {
    public static readonly UPDATE_PROFILE_TIME_STAMP_AUTHORIZED: string = 'UPDATE_PROFILE_TIME_STAMP_AUTHORIZED';
}

export abstract class UserErrorMesssages {
    public static readonly UPDATE_PROFILE_TIME_STAMP_NOT_AUTHORIZED: string = 'you can not update some of your profile data until you pass certain amount of time from the last update.';
}