export abstract class OrderIncludes {
    public static readonly USER: string = 'USER';
    public static readonly ORDER_ITEMS: string = 'ORDER_ITEMS';
}

export abstract class OrderItemIncludes {
    public static readonly ORDER: string = 'ORDER';
}

export abstract class OrderValidationErrors {
    public static readonly ORDER_CREATION_BLOCK: string = 'ORDER_CREATION_BLOCK';
    public static readonly CAN_NOT_UPDATE_ORDER: string = 'CAN_NOT_UPDATE_ORDER';
    public static readonly CAN_NOT_DELETE_ORDER: string = 'CAN_NOT_DELETE_ORDER';
    public static readonly ORDER_DISPLAY_BLOCK: string = 'ORDER_DISPLAY_BLOCK';
}

export abstract class OrderValidationCases {
    public static readonly NO_ORDER_CREATION_BLOCK: string = 'NO_ORDER_CREATION_BLOCK';
    public static readonly CAN_UPDATE_ORDER: string = 'CAN_UPDATE_ORDER';
    public static readonly CAN_DELETE_ORDER: string = 'CAN_DELETE_ORDER';
    public static readonly NO_ORDER_DISPLAY_BLOCK: string = 'NO_ORDER_DISPLAY_BLOCK';
}

export abstract class OrderErrorMessages {
    public static readonly ORDER_CREATION_BLOCK: string = 'you can not make order.';
    public static readonly CAN_NOT_UPDATE_ORDER: string = 'you can not update order.';
    public static readonly CAN_NOT_DELETE_ORDER: string = 'you can not delete order.';
    public static readonly ORDER_DISPLAY_BLOCK: string = 'you can not display order.';
}