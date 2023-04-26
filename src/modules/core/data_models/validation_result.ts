import { ProcessReult } from "./enums/process_result";
import { CoreValidationErrors, Errors } from "../helpers/constants";

export class ValidationResult {
    // we may add more info here
    // like more info about databse error, objects info where error happened
    constructor(result: ProcessReult, message: string, error: string, action: string, object: string, data) {
        this.result = result;
        this.message = message;
        this.error = error;
        this.action = action;
        this.object = object;
        this.data = data;
    }

    result: ProcessReult;
    message: string;
    error: string;
    action: string;
    object: string;
    data: object;

    static build(message: string, error: string, result: ProcessReult, object: string, action: string, data): ValidationResult {
        return new ValidationResult(
            result,
            message,
            error,
            action,
            object,
            data);
    }

    static buildSuccess(): ValidationResult {
        return new ValidationResult(ProcessReult.success,
            '',
            CoreValidationErrors.UNKNOWN,
            '',
            '',
            {});
    }

    static buildDefault(): ValidationResult {
        return new ValidationResult(ProcessReult.unknown,
            Errors.VALIDATOR_PARAM_TYPE_UNCOMPATABLE,
            CoreValidationErrors.UNKNOWN,
            '',
            '',
            {});
    }

    static buildEmpty(): ValidationResult {
        return new ValidationResult(ProcessReult.success,
            '',
            CoreValidationErrors.UNKNOWN,
            '',
            '',
            {});
    }

    static buildDatabaseError(): ValidationResult {
        return new ValidationResult(ProcessReult.failure,
            Errors.DATABASE_ERROR,
            CoreValidationErrors.DATABASE_ERROR,
            '',
            '',
            {});
    }
}