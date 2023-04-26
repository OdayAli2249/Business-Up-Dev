export abstract class SubscribtionIncludes {
    public static readonly USER: string = 'USER';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDER';
}

export abstract class SubscribtionValidationErrors {
    public static readonly ALREADY_SUBSCRIBED: string = 'ALREADY_SUBSCRIBED';
}

export abstract class SubscribtionValidationCases {
    public static readonly NOT_ALREADY_SUBSCRIBED: string = 'NOT_ALREADY_SUBSCRIBED';
}

export abstract class SubscribtionErrorMessages {
    public static readonly ALREADY_SUBSCRIBED: string = 'you have already subscribed to this service provider.';
}