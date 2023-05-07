export abstract class Errors {
    public static readonly PREVS_ERROR_MESSAGE: string = "you don't have access to this resource";
    public static readonly VALIDATOR_PARAM_TYPE_UNCOMPATABLE: string = "this validator is not compatable with this param type";
    public static readonly DATABASE_ERROR: string = "database error";
    public static readonly PREVS_ERROR_NAME: string = "previllage error";
}

export abstract class CUDResponseTemplateMessages {
    public static readonly CREATE_TEMPLATE_MESSAGE: string = "Created";
    public static readonly UPDATE_TEMPLATE_MESSAGE: string = "Updated";
    public static readonly DELETE_TEMPLATE_MESSAGE: string = "Deleted";
}

export abstract class Actions {
    public static readonly CREATE: string = "Create";
    public static readonly UPDATE: string = "Update";
    public static readonly DELETE: string = "Delete";
}


export abstract class CoreValidationErrors {
    public static readonly UNKNOWN: string = 'UNKNOWN';
    public static readonly DATABASE_ERROR: string = 'DATABASE_ERROR';
    public static readonly NEITHER_MASTER_NOR_SUBMASTER: string = 'NEITHER_MASTER_NOR_SUBMASTER';
    public static readonly CAN_NOT_DO_THIS_ACTION: string = 'CAN_NOT_DO_THIS_ACTION';
    public static readonly TIME_STAMP_NOT_AUTHORIZED: string = 'TIME_STAMP_NOT_AUTHORIZED';
    public static readonly NO_ACCESS_TO_RESOURCE: string = 'NO_ACCESS_TO_RESOURCE';
    public static readonly DATA_SOURCE_IS_LOCKED: string = 'DATA_SOURCE_IS_LOCKED';
}

export abstract class CoreValidationCases {
    public static readonly MASTER_OR_SUBMASTER: string = 'MASTER_OR_SUBMASTER';
    public static readonly CAN_DO_THIS_ACTION: string = 'CAN_DO_THIS_ACTION';
    public static readonly TIME_STAMP_AUTHORIZED: string = 'TIME_STAMP_AUTHORIZED';
    public static readonly HAVE_ACCESS_TO_RESOURCE: string = 'HAVE_ACCESS_TORESOURCE';
    public static readonly DATA_SOURCE_IS_UNLOCKED: string = 'DATA_SOURCE_IS_UNLOCKED';
    public static readonly USER_WORKS_IN_SERVICE_PROVIDER: string = 'USER_WORKS_IN_SERVICE_PROVIDER';
}

export abstract class CoreErrorMessage {
    public static readonly UNKNOWN: string = 'unknown';
    public static readonly DATABASE_ERROR: string = 'database error, this may happen in bad request params';
    public static readonly NEITHER_MASTER_NOR_SUBMASTER: string = 'you are not master or sub-master to do this kind of actions';
    public static readonly CAN_NOT_DO_THIS_ACTION: string = 'you should be assigned a permission to do this action. So, since you do not have permission you can not do this action.';
    public static readonly TIME_STAMP_NOT_AUTHORIZED: string = 'you are not authorized to do this action in this time.';
    public static readonly NO_ACCESS_TO_RESOURCE: string = 'you may have permission to this resource; however, for some reason you do not have access now. may be you will later.';
    public static readonly DATA_SOURCE_IS_LOCKED: string = 'data source is locked now. this happen when multiple processes try to access that resource at the same time, try in a second, or may be later.';
}