import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { PermissionGroupErrorMessages, PermissionGroupValidationErrors } from 'src/modules/permissions/helpers/constants';

@Injectable()
export class PermissionHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case PermissionGroupValidationErrors.CUD_OPERATIONS_DENY: {
                return this.createErrorObject(PermissionGroupErrorMessages.CUD_OPERATIONS_DENY, validationResult, failure);
            }
            case PermissionGroupValidationErrors.RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES: {
                return this.createErrorObject(PermissionGroupErrorMessages.RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
