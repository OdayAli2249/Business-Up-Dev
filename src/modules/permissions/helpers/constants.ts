export abstract class PermissionGroupIncludes {
    public static readonly BRANCH: string = 'BRANCH';
    public static readonly USERS: string = 'USERS';
    public static readonly POSTS: string = 'POSTS';
    public static readonly PRODUCTS: string = 'PRODUCTS';
    public static readonly SERVICES: string = 'SERVICES';
}

export abstract class PermissionGroupValidationErrors {
    public static readonly RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES: string = 'RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES';
    public static readonly CUD_OPERATIONS_DENY: string = 'CUD_OPERATIONS_DENY';
}

export abstract class PermissionGroupValidationCases {
    public static readonly RESOURCES_ARE_IN_THEIR_CORRECT_BRANCHES: string = 'RESOURCES_ARE_IN_THEIR_CORRECT_BRANCHES';
    public static readonly NO_TEMPORARY_CUD_OPERATIONS_DENY: string = 'NO_TEMPORARY_CUD_OPERATIONS_DENY';
}

export abstract class PermissionGroupErrorMessages {
    public static readonly RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES: string = 'some resources are not in their corrent branches.';
    public static readonly CUD_OPERATIONS_DENY: string = 'there is temporary create - update - delete operations deny.';
}