import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { HiringRequestErrorMessages, HiringRequestValidationErrors } from 'src/modules/hiring_requests/helpers/constant';

@Injectable()
export class HiringRequestHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case HiringRequestValidationErrors.CAN_NOT_APPLY_FOR_HIRING_REQUEST: {
                return this.createErrorObject(HiringRequestErrorMessages.CAN_NOT_APPLY_FOR_HIRING_REQUEST, validationResult, failure);
            }
            case HiringRequestValidationErrors.NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED: {
                return this.createErrorObject(HiringRequestErrorMessages.NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED, validationResult, failure);
            }
            case HiringRequestValidationErrors.NOT_PENDING: {
                return this.createErrorObject(HiringRequestErrorMessages.NOT_PENDING, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
