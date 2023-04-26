export abstract class ProductIncludes {
    public static readonly ORDER_ITEMS: string = 'ORDER_ITEMS';
    public static readonly BRANCH: string = 'BRANCH';
}

export abstract class ProductValidationErrors {
    public static readonly DISPLAY_PRODUCTS_BLOCKED: string = 'DISPLAY_PRODUCTS_BLOCKED';
    public static readonly TEMPORARY_PRODUCTS_UPDATE_DENY: string = 'TEMPORARY_PRODUCT_UPDATE_DENY';
    public static readonly TEMPORARY_PRODUCTS_CREATE_DENY: string = 'TEMPORARY_PRODUCT_CREATE_DENY';
    public static readonly TEMPORARY_PRODUCTS_DELETE_DENY: string = 'TEMPORARY_PRODUCT_DELETE_DENY';
}

export abstract class ProductValidationCases {
    public static readonly CAN_DISPLAY_PRODUCTS: string = 'CAN_DISPLAY_PRODUCTS';
    public static readonly NO_TEMPORARY_PRODUCT_UPDATE_DENY: string = 'NO_TEMPORARY_PRODUCT_UPDATE_DENY';
    public static readonly NO_TEMPORARY_PRODUCT_CREATE_DENY: string = 'NO_TEMPORARY_PRODUCT_CREATE_DENY';
    public static readonly NO_TEMPORARY_PRODUCT_DELETE_DENY: string = 'NO_TEMPORARY_PRODUCT_DELETE_DENY';
}

export abstract class ProductErrorMessages {
    public static readonly DISPLAY_PRODUCTS_BLOCKED: string = 'display products is blocked.';
    public static readonly TEMPORARY_PRODUCT_UPDATE_DENY: string = 'update product is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_PRODUCT_CREATE_DENY: string = 'create product is denied, check your provider permissions or try in another time.';
    public static readonly TEMPORARY_PRODUCT_DELETE_DENY: string = 'delete product is denied, check your provider permissions or try in another time.';
}