import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { CommentErrorMessages, CommentValidationErrors } from '../../../helpers/constant';

@Injectable()
export class CommentHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case CommentValidationErrors.CAN_NOT_DELETE_COMMENT: {
                return this.createErrorObject(CommentErrorMessages.CAN_NOT_DELETE_COMMENT, validationResult, failure);
            }
            case CommentValidationErrors.CAN_NOT_UPDATE_COMMMENT: {
                return this.createErrorObject(CommentErrorMessages.CAN_NOT_UPDATE_COMMMENT, validationResult, failure);
            }
            case CommentValidationErrors.COMMENT_CREATION_BLOCK: {
                return this.createErrorObject(CommentErrorMessages.COMMENT_CREATION_BLOCK, validationResult, failure);
            }
            case CommentValidationErrors.COMMENT_DISPLAY_BLOCK: {
                return this.createErrorObject(CommentErrorMessages.COMMENT_DISPLAY_BLOCK, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
