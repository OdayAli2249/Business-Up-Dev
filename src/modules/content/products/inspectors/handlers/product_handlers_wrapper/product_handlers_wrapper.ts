import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { ProductErrorMessages, ProductValidationErrors } from '../../../helpers/constants';

@Injectable()
export class ProductHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case ProductValidationErrors.DISPLAY_PRODUCTS_BLOCKED: {
                return this.createErrorObject(ProductErrorMessages.DISPLAY_PRODUCTS_BLOCKED, validationResult, failure);
            }
            case ProductValidationErrors.TEMPORARY_PRODUCTS_CREATE_DENY: {
                return this.createErrorObject(ProductErrorMessages.TEMPORARY_PRODUCT_CREATE_DENY, validationResult, failure);
            }
            case ProductValidationErrors.TEMPORARY_PRODUCTS_DELETE_DENY: {
                return this.createErrorObject(ProductErrorMessages.TEMPORARY_PRODUCT_DELETE_DENY, validationResult, failure);
            }
            case ProductValidationErrors.TEMPORARY_PRODUCTS_UPDATE_DENY: {
                return this.createErrorObject(ProductErrorMessages.TEMPORARY_PRODUCT_UPDATE_DENY, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }

        }
    }
}
