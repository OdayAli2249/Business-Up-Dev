import { BaseDTO } from '../../data_models/dtos/base_dto';
import { FailureOr } from '../../data_models/failure_or';
import { BaseParam } from '../../data_models/params/base_param';
import { BaseResponse } from '../../data_models/responses/base_response';
import { ValidationResult } from '../../data_models/validation_result';
import { Failure } from '../../errors/failure';
import { CoreErrorMessage, CoreValidationErrors } from '../../helpers/constants';

export abstract class CoreHandlersWrapper {

    constructor() { }

    handle<R extends BaseResponse, T extends BaseDTO>(param: BaseParam<T>, callBack: () => Promise<R>): Promise<FailureOr<R>> {
        let validationErrors;
        let failure: Failure;
        let data: R;
        return new Promise(async (resolve, _) => {
            try {

                data = await callBack();
                resolve(FailureOr.buildSuccess(data));
            } catch (err) {
                validationErrors = err as ValidationResult[];
                failure = Failure.buildDefault();
                for (var index = 0; index < validationErrors.length; index++) {
                    failure = this.handleError(validationErrors[index], failure)
                }
            } finally {
                resolve(FailureOr.buildFailure('', failure));
            }
        });
    }

    abstract handleError(validationResult: ValidationResult, failure: Failure): Failure;

    handleCoreError(validationResult: ValidationResult, failure: Failure): Failure {

        switch (validationResult.error) {
            case CoreValidationErrors.CAN_NOT_DO_THIS_ACTION: {
                return this.createErrorObject(CoreErrorMessage.CAN_NOT_DO_THIS_ACTION, validationResult, failure);
            }
            case CoreValidationErrors.DATABASE_ERROR: {
                return this.createErrorObject(CoreErrorMessage.DATABASE_ERROR, validationResult, failure);
            }
            case CoreValidationErrors.DATA_SOURCE_IS_LOCKED: {
                return this.createErrorObject(CoreErrorMessage.DATA_SOURCE_IS_LOCKED, validationResult, failure);
            }
            case CoreValidationErrors.NEITHER_MASTER_NOR_SUBMASTER: {
                return this.createErrorObject(CoreErrorMessage.NEITHER_MASTER_NOR_SUBMASTER, validationResult, failure);
            }
            case CoreValidationErrors.NO_ACCESS_TO_RESOURCE: {
                return this.createErrorObject(CoreErrorMessage.NO_ACCESS_TO_RESOURCE, validationResult, failure);
            }
            case CoreValidationErrors.TIME_STAMP_NOT_AUTHORIZED: {
                return this.createErrorObject(CoreErrorMessage.TIME_STAMP_NOT_AUTHORIZED, validationResult, failure);
            }
            default: {
                return failure;
            }
        }
    }

    createErrorObject(message: string, validationResults: ValidationResult, failure: Failure): Failure {
        if (!failure.status)
            failure.status = 404;
        if (!failure.action)
            failure.action = validationResults.action;
        failure.object.push(validationResults.object);
        failure.addDescriptionLine(message);
        return failure;
    }
}
