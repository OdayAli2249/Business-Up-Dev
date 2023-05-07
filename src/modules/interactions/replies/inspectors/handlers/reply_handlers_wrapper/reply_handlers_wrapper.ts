import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { ReplyValidationErrors } from '../../../helpers/constants';

@Injectable()
export class ReplyHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case ReplyValidationErrors.CAN_NOT_DELETE_REPLY: {
                return this.createErrorObject('you can not delete others replies', validationResult, failure);
            }
            case ReplyValidationErrors.CAN_NOT_UPDATE_REPLY: {
                return this.createErrorObject('you can not update others replies', validationResult, failure);
            }
            case ReplyValidationErrors.REPLY_CREATION_BLOCK: {
                return this.createErrorObject('', validationResult, failure);
            }
            case ReplyValidationErrors.REPLY_DISPLAY_BLOCK: {
                return this.createErrorObject('', validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
