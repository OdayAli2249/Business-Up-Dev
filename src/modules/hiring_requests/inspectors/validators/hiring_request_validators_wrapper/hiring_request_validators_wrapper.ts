import { Injectable } from '@nestjs/common';
import { HiringRequestValidatorImpl } from '../hiring_request_validator_impl/hiring_request_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { HiringRequestValidationCases } from 'src/modules/hiring_requests/helpers/constant';
import { CreateHiringRequestDTO } from 'src/modules/hiring_requests/data_models/dtos/create_hiring_request_dto';

@Injectable()
export class HiringRequestValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly hiringRequestValidator: HiringRequestValidatorImpl) {
        super(hiringRequestValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case HiringRequestValidationCases.CAN_USER_APPLY_FOR_HIRING_REQUEST: {
                        result = await this.hiringRequestValidator.canUserApplyForHiringRequest(param);
                        resolve(result);
                        break;
                    }
                    case HiringRequestValidationCases.IS_REJECTED_OR_NOT_ALREADY_CREATED: {
                        result = await this.hiringRequestValidator.isRejectedOrNotAlreadyCreated(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    case HiringRequestValidationCases.IS_PENDING: {
                        result = await this.hiringRequestValidator.isPending(
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
