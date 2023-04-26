import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { ServiceErrorMessages, ServiceValidationErrors } from '../../../helpers/constants';

@Injectable()
export class ServiceHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case ServiceValidationErrors.DISPLAY_SERVICES_BLOCKED: {
                return this.createErrorObject(ServiceErrorMessages.DISPLAY_SERVICES_BLOCKED, validationResult, failure);
            }
            case ServiceValidationErrors.TEMPORARY_SERVICE_CREATE_DENY: {
                return this.createErrorObject(ServiceErrorMessages.TEMPORARY_SERVICE_CREATE_DENY, validationResult, failure);
            }
            case ServiceValidationErrors.TEMPORARY_SERVICE_DELETE_DENY: {
                return this.createErrorObject(ServiceErrorMessages.TEMPORARY_SERVICE_DELETE_DENY, validationResult, failure);
            }
            case ServiceValidationErrors.TEMPORARY_SERVICE_UPDATE_DENY: {
                return this.createErrorObject(ServiceErrorMessages.TEMPORARY_SERVICE_UPDATE_DENY, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
