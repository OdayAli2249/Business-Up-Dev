export abstract class BranchIncludes {
    public static readonly POSTS: string = 'Posts';
    public static readonly PRODUCTS: string = 'Products';
    public static readonly SERVICES: string = 'Services';
    public static readonly USERS: string = 'Users';
    public static readonly SERVICE_PROVIDER: string = 'ServiceProvider';
}

export abstract class BranchValidationErrors {
    public static readonly DISPLAY_BRANCHES_BLOCKED: string = 'DISPLAY_BRANCHES_BLOCKED';
    public static readonly SOURCE_AND_TARGET_USERS_INTERSECTION: string = 'SOURCE_AND_TARGET_USERS_INTERSECTION';
    public static readonly USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES: string = 'USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES';
    public static readonly USERS_NOT_IN_PENDING_HIRING_REQUEST: string = 'USERS_NOT_INPENDING_HIRING_REQUEST';
    public static readonly USERS_NOT_NEW_TO_SERVICE_PROVIDER: string = 'USERS_NOT_NEW_TO_SERVICE_PROVIDER';
}

export abstract class BranchValidationCases {
    public static readonly USERS_IN_PENDING_HIRING_REQUESTS: string = 'USERS_IN_PENDING_HIRING_REQUESTS';
    public static readonly SOURCE_AND_TARGET_USERS_SEPARATED: string = 'SOURCE_AND_TARGET_USERS_SEPARATED';
    public static readonly USERS_ARE_IN_THEIR_CORRECT_BRANCHES: string = 'USERS_ARE_IN_THEIR_CORRECT_BRANCHES';
    public static readonly DISPLAY_BRANCHES_ALLOWED: string = 'DISPLAY_BRANCHES_ALLOWED';
    public static readonly USERS_ARE_NEW_TO_SERVICE_PROVIDER: string = 'USERS_ARE_NEW_TO_SERVICE_PROVIDER';
    public static readonly NO_MASTER_OR_SUB_MASTER_USERS_IN_SOURCE_BRANCHES: string = 'NO_MASTER_OR_SUB_MASTER_USERS_IN_SOURCE_BRANCHES';
    public static readonly NO_USERS_WILL_BE_REMOVED_FROM_ENTIRE_SERVICE_PROVIDER: string = 'NO_USERS_WILL_BE_REMOVED_FROM_ENTIRE_SERVICE_PROVIDER';
}

export abstract class BranchErrorMessages {
    public static readonly DISPLAY_BRANCHES_BLOCKED: string = 'users are not in pending hiring requests.';
    public static readonly SOURCE_AND_TARGET_USERS_INTERSECTION: string = 'there is intersection in source and target branch users.';
    public static readonly USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES: string = 'some users are not in their correct branches.';
    public static readonly USERS_NOT_IN_PENDING_HIRING_REQUEST: string = "some (or all ) of users are not in pending hiring requests.";
    public static readonly USERS_NOT_NEW_TO_SERVICE_PROVIDER: string = 'users are not new to service provider.';
}