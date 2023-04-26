export abstract class BaseError extends Error {

    constructor(options: { name: string, message: string }) {
        super();
        super.message = options.message;
        super.name = options.name;
    }
}