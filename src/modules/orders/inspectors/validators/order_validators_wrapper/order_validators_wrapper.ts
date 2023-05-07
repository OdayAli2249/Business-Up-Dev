import { Injectable } from '@nestjs/common';
import { OrderValidatorImpl } from '../order_validator_impl/order_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { OrderValidationCases } from 'src/modules/orders/helpers/constants';
import { CreateOrderDTO } from 'src/modules/orders/data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from 'src/modules/orders/data_models/dtos/update_order_dto';

@Injectable()
export class OrderValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly orderValidator: OrderValidatorImpl) {
        super(orderValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case OrderValidationCases.CAN_DELETE_ORDER: {
                        result = await this.orderValidator.canCancelOrder(param);
                        resolve(result);
                        break;
                    }
                    case OrderValidationCases.CAN_UPDATE_ORDER: {
                        result = await this.orderValidator.canUpdateOrder(
                            (param as unknown) as BaseParam<UpdateOrderDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case OrderValidationCases.NO_ORDER_CREATION_BLOCK: {
                        result = await this.orderValidator.noOrderCreationBlocked(
                            (param as unknown) as BaseParam<CreateOrderDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case OrderValidationCases.NO_ORDER_DISPLAY_BLOCK: {
                        result = await this.orderValidator.noOrderDisplayBlocked(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    default: {
                        result = await this.checkForCore(validationCase, param);
                        resolve(result);
                        break;
                    }
                }
            } catch (err) {
                // resolve for database errors from validations
                // or type parsing error
                // but for now, we consider both as database error
                resolve(ValidationResult.buildDatabaseError())
            }
        });
    }
}
