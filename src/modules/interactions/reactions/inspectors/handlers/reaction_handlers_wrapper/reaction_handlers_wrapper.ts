import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { ReactionErrorMessages, ReactionValidationErrors } from '../../../helpers/constant';

@Injectable()
export class ReactionHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case ReactionValidationErrors.CAN_NOT_DELETE_REACTION: {
                return this.createErrorObject(ReactionErrorMessages.CAN_NOT_DELETE_REACTION, validationResult, failure);
            }
            case ReactionValidationErrors.CAN_NOT_UPDATE_REACTION: {
                return this.createErrorObject(ReactionErrorMessages.CAN_NOT_UPDATE_REACTION, validationResult, failure);
            }
            case ReactionValidationErrors.REACTION_CREATION_BLOCK: {
                return this.createErrorObject(ReactionErrorMessages.REACTION_CREATION_BLOCK, validationResult, failure);
            }
            case ReactionValidationErrors.REACTION_DISPLAY_BLOCK: {
                return this.createErrorObject(ReactionErrorMessages.REACTION_DISPLAY_BLOCK, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
