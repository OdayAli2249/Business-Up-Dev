export abstract class ServiceIncludes {
    public static readonly REACTIONS: string = 'REACTIONS';
    public static readonly COMMENTS: string = 'COMMENTS';
    public static readonly BRANCH: string = 'BRANCH';
    public static readonly PERMISSIONS: string = 'PERMISSIONS';
    public static readonly ORDER_ITEM: string = 'ORDER_ITEM';
}

export abstract class ServiceValidationErrors {
    public static readonly DISPLAY_SERVICES_BLOCKED: string = 'DISPLAY_SERVICES_BLOCKED';
    public static readonly TEMPORARY_SERVICE_UPDATE_DENY: string = 'TEMPORARY_SERVICE_UPDATE_DENY';
    public static readonly TEMPORARY_SERVICE_CREATE_DENY: string = 'TEMPORARY_SERVICE_CREATE_DENY';
    public static readonly TEMPORARY_SERVICE_DELETE_DENY: string = 'TEMPORARY_SERVICE_DELETE_DENY';
}

export abstract class ServiceValidationCases {
    public static readonly CAN_DISPLAY_SERVICES: string = 'CAN_DISPLAY_SERVICES';
    public static readonly NO_TEMPORARY_SERVICE_UPDATE_DENY: string = 'NO_TEMPORARY_SERVICE_UPDATE_DENY';
    public static readonly NO_TEMPORARY_SERVICE_CREATE_DENY: string = 'NO_TEMPORARY_SERVICE_CREATE_DENY';
    public static readonly NO_TEMPORARY_SERVICE_DELETE_DENY: string = 'NO_TEMPORARY_SERVICE_DELETE_DENY';
}

export abstract class ServiceErrorMessages {
    public static readonly DISPLAY_SERVICES_BLOCKED: string = 'display services is blocked.';
    public static readonly TEMPORARY_SERVICE_UPDATE_DENY: string = 'update service is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_SERVICE_CREATE_DENY: string = 'create service is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_SERVICE_DELETE_DENY: string = 'delete service is denied, check your provider permissions or try in another time.';
}