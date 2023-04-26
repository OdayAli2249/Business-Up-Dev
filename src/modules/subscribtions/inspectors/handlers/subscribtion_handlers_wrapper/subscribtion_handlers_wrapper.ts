import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { SubscribtionErrorMessages, SubscribtionValidationErrors } from 'src/modules/subscribtions/helpers/constants';

@Injectable()
export class SubscribtionHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case SubscribtionValidationErrors.ALREADY_SUBSCRIBED: {
                return this.createErrorObject(SubscribtionErrorMessages.ALREADY_SUBSCRIBED, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
