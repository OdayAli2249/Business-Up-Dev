import { Injectable } from '@nestjs/common';
import { ProductValidator } from '../product_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateProductDTO } from '../../../data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../../data_models/dtos/update_product_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class ProductValidatorImpl extends CoreValidatorImpl implements ProductValidator {
    constructor(private readonly database: Db) {
        super()
    }
    canDisplayProducts(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary product display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryProductUpdateDeny(param: BaseParam<UpdateProductDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary product update now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryProductCreateDeny(param: BaseParam<CreateProductDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary product create now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryProductDeleteDeny(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary product delete now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
}
