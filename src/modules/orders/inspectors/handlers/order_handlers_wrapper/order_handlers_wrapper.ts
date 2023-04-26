import { Injectable } from '@nestjs/common';
import { CoreHandlersWrapper } from 'src/modules/core/inspectors/handlers/core_handlers_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { Failure } from 'src/modules/core/errors/failure';
import { OrderErrorMessages, OrderValidationErrors } from 'src/modules/orders/helpers/constants';

@Injectable()
export class OrderHandlersWrapper extends CoreHandlersWrapper {
    handleError(validationResult: ValidationResult, failure: Failure): Failure {
        switch (validationResult.error) {
            case OrderValidationErrors.CAN_NOT_DELETE_ORDER: {
                return this.createErrorObject(OrderErrorMessages.CAN_NOT_DELETE_ORDER, validationResult, failure);
            }
            case OrderValidationErrors.CAN_NOT_UPDATE_ORDER: {
                return this.createErrorObject(OrderErrorMessages.CAN_NOT_UPDATE_ORDER, validationResult, failure);
            }
            case OrderValidationErrors.ORDER_CREATION_BLOCK: {
                return this.createErrorObject(OrderErrorMessages.ORDER_CREATION_BLOCK, validationResult, failure);
            }
            case OrderValidationErrors.ORDER_DISPLAY_BLOCK: {
                return this.createErrorObject(OrderErrorMessages.ORDER_DISPLAY_BLOCK, validationResult, failure);
            }
            default: {
                return this.handleCoreError(validationResult, failure);
            }
        }
    }
}
