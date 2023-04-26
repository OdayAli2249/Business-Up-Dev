import { Injectable } from '@nestjs/common';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { Failure } from 'src/modules/core/errors/failure';
import { BranchErrorMessages, BranchValidationErrors } from 'src/modules/branches/helpers/constants';


@Injectable()
export class BranchHandlersWrapper extends CoreHandlersWrapper {

    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case BranchValidationErrors.DISPLAY_BRANCHES_BLOCKED: {
                return this.createErrorObject(BranchErrorMessages.DISPLAY_BRANCHES_BLOCKED, validationResult, failure);
            }
            case BranchValidationErrors.SOURCE_AND_TARGET_USERS_INTERSECTION: {
                return this.createErrorObject(BranchErrorMessages.SOURCE_AND_TARGET_USERS_INTERSECTION, validationResult, failure);
            }
            case BranchValidationErrors.USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES: {
                return this.createErrorObject(BranchErrorMessages.USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES, validationResult, failure);
            }
            case BranchValidationErrors.USERS_NOT_IN_PENDING_HIRING_REQUEST: {
                return this.createErrorObject(BranchErrorMessages.USERS_NOT_IN_PENDING_HIRING_REQUEST, validationResult, failure);
            }
            case BranchValidationErrors.USERS_NOT_NEW_TO_SERVICE_PROVIDER: {
                return this.createErrorObject(BranchErrorMessages.USERS_NOT_NEW_TO_SERVICE_PROVIDER, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
