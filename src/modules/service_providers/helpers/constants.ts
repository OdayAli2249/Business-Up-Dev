export abstract class ServiceProviderIncludes {
    public static readonly SUBSCRIBTION: string = 'SUBSCRIBTION';
    public static readonly BRANCHES: string = 'BRANCHES';
    public static readonly COMMENTS: string = 'COMMENTS';
    public static readonly REACTIONS: string = 'REACTIONS';
    public static readonly REPLIES: string = 'REPLIES';
}

export abstract class ServiceProviderValidationErrors {
    public static readonly NOT_MASTER: string = 'NOT_MASTER';
    public static readonly THE_ONLY_MASTER_IN_SERVICE_PROVIDER: string = 'THE_ONLY_MASTER_IN_SERVICE_PROVIDER';
    public static readonly USER_DO_NOT_WORK_IN_SERVICE_PROVIDER: string = 'USER_DO_NOT_WORK_IN_SERVICE_PROVIDER';
    public static readonly EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER: string = 'EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER';
}

export abstract class ServiceProviderValidationCases {
    public static readonly IS_MASTER: string = 'IS_MASTER';
    public static readonly NOT_THE_ONLY_MASTER_IN_SERVICE_PROVIDER: string = 'NOT_THE_ONLY_MASTER_IN_SERVICE_PROVIDER';
    public static readonly USER_WORKS_IN_SERVICE_PROVIDER: string = 'USER_WORKS_IN_SERVICE_PROVIDER';
    public static readonly NOT_EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER: string = 'NOT_EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER';
}

export abstract class ServiceProviderErrorMessages {
    public static readonly NOT_MASTER: string = 'you should be master to do this action (even sub-master can not do it).';
    public static readonly THE_ONLY_MASTER_IN_SERVICE_PROVIDER: string = 'you are the only master in the service provider!';
    public static readonly USER_DO_NOT_WORK_IN_SERVICE_PROVIDER: string = 'this user do not work in service provider!';
    public static readonly EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER: string = 'you have exceeded the allowed number of service providers for the same master user.';
}