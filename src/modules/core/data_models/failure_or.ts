import { Failure } from "../errors/failure";
import { ProcessReult } from "./enums/process_result";
import { BaseResponse } from "./responses/base_response";

export class FailureOr<T extends BaseResponse>{
    private constructor(response: T, message: string, failure: Failure, processResult: ProcessReult) {
        this.response = response;
        this.message = message;
        this.failure = failure;
        this.result = processResult;
    }

    private response: T;
    message: string;
    private failure: Failure
    result: ProcessReult;

    static buildSuccess<R extends BaseResponse>(data: R): FailureOr<R> {
        return new FailureOr<R>(data, null, null, ProcessReult.success)
    }


    static buildFailure<R extends BaseResponse>(message: string, failure: Failure): FailureOr<any> {
        return new FailureOr<R>(null, message, failure, ProcessReult.failure)
    }

    getResponse(): T {
        return this.response;
    }

    getFailure(): Failure {
        return this.failure;
    }

    getReult(): ProcessReult {
        return this.result;
    }
}