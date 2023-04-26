import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { UserErrorMesssages, UserValidationErrors } from 'src/modules/users/helpers/constants';

@Injectable()
export class UserHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case UserValidationErrors.UPDATE_PROFILE_TIME_STAMP_NOT_AUTHORIZED: {
                return this.createErrorObject(UserErrorMesssages.UPDATE_PROFILE_TIME_STAMP_NOT_AUTHORIZED, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
