import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { PostErrorMessages, PostValidationErrors } from '../../../helpers/constansts';

@Injectable()
export class PostHandlersWrapper extends CoreHandlersWrapper {

    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case PostValidationErrors.DISPLAY_POSTS_BLOCKED: {
                return this.createErrorObject(PostErrorMessages.DISPLAY_POSTS_BLOCKED, validationResult, failure);
            }
            case PostValidationErrors.TEMPORARY_POST_CREATE_DENY: {
                return this.createErrorObject(PostErrorMessages.TEMPORARY_POST_CREATE_DENY, validationResult, failure);
            }
            case PostValidationErrors.TEMPORARY_POST_DELETE_DENY: {
                return this.createErrorObject(PostErrorMessages.TEMPORARY_POST_DELETE_DENY, validationResult, failure);
            }
            case PostValidationErrors.TEMPORARY_POST_UPDATE_DENY: {
                return this.createErrorObject(PostErrorMessages.TEMPORARY_POST_UPDATE_DENY, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }

        }
    }
}
