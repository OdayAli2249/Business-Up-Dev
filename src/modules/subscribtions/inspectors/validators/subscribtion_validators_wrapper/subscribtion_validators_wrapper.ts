import { Injectable } from '@nestjs/common';
import { SubscribtionValidatorImpl } from '../subscribtion_validator_impl/subscribtion_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { SubscribtionValidationCases } from 'src/modules/subscribtions/helpers/constants';
import { CreateSubscribtionDTO } from 'src/modules/subscribtions/data_models/dtos/create_subscribtion_dto';

@Injectable()
export class SubscribtionValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly subscribtionrValidator: SubscribtionValidatorImpl) {
        super(subscribtionrValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case SubscribtionValidationCases.NOT_ALREADY_SUBSCRIBED: {
                        result = await this.subscribtionrValidator.notAlreadySubscribed(
                            (param as unknown) as BaseParam<CreateSubscribtionDTO>
                        );
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
