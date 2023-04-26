import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { ServiceProviderErrorMessages, ServiceProviderValidationErrors } from 'src/modules/service_providers/helpers/constants';
import { ServiceErrorMessages } from 'src/modules/content/services/helpers/constants';

@Injectable()
export class ServiceProviderHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case ServiceProviderValidationErrors.EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER: {
                return this.createErrorObject(ServiceProviderErrorMessages.EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER, validationResult, failure);
            }
            case ServiceProviderValidationErrors.NOT_MASTER: {
                return this.createErrorObject(ServiceProviderErrorMessages.NOT_MASTER, validationResult, failure);
            }
            case ServiceProviderValidationErrors.THE_ONLY_MASTER_IN_SERVICE_PROVIDER: {
                return this.createErrorObject(ServiceProviderErrorMessages.THE_ONLY_MASTER_IN_SERVICE_PROVIDER, validationResult, failure);
            }
            case ServiceProviderValidationErrors.USER_DO_NOT_WORK_IN_SERVICE_PROVIDER: {
                return this.createErrorObject(ServiceProviderErrorMessages.USER_DO_NOT_WORK_IN_SERVICE_PROVIDER, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
