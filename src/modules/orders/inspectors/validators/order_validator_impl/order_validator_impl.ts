import { Injectable } from '@nestjs/common';
import { OrderValidator } from '../order_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateOrderDTO } from 'src/modules/orders/data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from 'src/modules/orders/data_models/dtos/update_order_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class OrderValidatorImpl extends CoreValidatorImpl implements OrderValidator {
    constructor(private readonly database: Db) {
        super()
    }
    noOrderCreationBlocked(param: BaseParam<CreateOrderDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary order creation now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    canUpdateOrder(param: BaseParam<UpdateOrderDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // we should check if the user trying to update this order is the owner.
            resolve(ValidationResult.buildSuccess())
        });
    }
    canCancelOrder(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // we should check if the user trying to cancel this order is the owner.
            resolve(ValidationResult.buildSuccess())
        });
    }
    noOrderDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary order display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
}
