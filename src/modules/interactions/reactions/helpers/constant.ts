export abstract class ReactionIncludes {
    public static readonly USER: string = 'USER';
    public static readonly SERVICE_PROVIDER: string = 'SERVICE_PROVIDER';
    public static readonly POST: string = 'POST';
    public static readonly SERVICE: string = 'SERVICE';
    public static readonly REPLIES: string = 'REPLIES';
}

export abstract class ReactionValidationErrors {
    public static readonly REACTION_CREATION_BLOCK: string = 'REACTION_CREATION_BLOCK';
    public static readonly CAN_NOT_UPDATE_REACTION: string = 'CAN_NOT_UPDATE_REACTION';
    public static readonly CAN_NOT_DELETE_REACTION: string = 'CAN_NOT_DELETE_REACTION';
    public static readonly REACTION_DISPLAY_BLOCK: string = 'REACTION_DISPLAY_BLOCK';
}

export abstract class ReactionValidationCases {
    public static readonly NO_REACTION_CREATION_BLOCK: string = 'NO_REACTION_CREATION_BLOCK';
    public static readonly CAN_UPDATE_REACTION: string = 'CAN_UPDATE_REACTION';
    public static readonly CAN_DELETE_REACTION: string = 'CAN_DELETE_REACTION';
    public static readonly NO_REACTION_DISPLAY_BLOCK: string = 'NO_REACTION_DISPLAY_BLOCK';
}

export abstract class ReactionErrorMessages {
    public static readonly REACTION_CREATION_BLOCK: string = 'you can not reaction on this resource.';
    public static readonly CAN_NOT_UPDATE_REACTION: string = 'you can not update reaction on this resource.';
    public static readonly CAN_NOT_DELETE_REACTION: string = 'you can not delete reaction on this resource.';
    public static readonly REACTION_DISPLAY_BLOCK: string = 'you can not display reactions on this resource.';
}