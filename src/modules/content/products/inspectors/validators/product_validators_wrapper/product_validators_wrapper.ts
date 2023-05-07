import { Injectable } from '@nestjs/common';
import { ProductValidatorImpl } from '../product_validator_impl/product_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ProductValidationCases } from '../../../helpers/constants';
import { CreateProductDTO } from '../../../data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../../data_models/dtos/update_product_dto';

@Injectable()
export class ProductValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly productValidator: ProductValidatorImpl) {
        super(productValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case ProductValidationCases.CAN_DISPLAY_PRODUCTS: {
                        result = await this.productValidator.canDisplayProducts(param);
                        resolve(result);
                        break;
                    }
                    case ProductValidationCases.NO_TEMPORARY_PRODUCT_CREATE_DENY: {
                        result = await this.productValidator.noTemporaryProductCreateDeny(
                            (param as unknown) as BaseParam<CreateProductDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ProductValidationCases.NO_TEMPORARY_PRODUCT_DELETE_DENY: {
                        result = await this.productValidator.noTemporaryProductDeleteDeny(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    case ProductValidationCases.NO_TEMPORARY_PRODUCT_UPDATE_DENY: {
                        result = await this.productValidator.noTemporaryProductUpdateDeny(
                            (param as unknown) as BaseParam<UpdateProductDTO>
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
