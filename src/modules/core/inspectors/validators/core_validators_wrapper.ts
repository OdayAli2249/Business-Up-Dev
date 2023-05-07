import { CoreValidatorImpl } from './core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { BaseDTO } from '../../data_models/dtos/base_dto';
import { BaseParam } from '../../data_models/params/base_param';
import { CoreValidationCases } from '../../helpers/constants';
import { BaseResponse } from '../../data_models/responses/base_response';
import { ProcessReult } from '../../data_models/enums/process_result';

export abstract class CoreValidatorsWrapper {

    constructor(private readonly coreValidator: CoreValidatorImpl) { }

    validate<R extends BaseResponse, T extends BaseDTO>(param: BaseParam<T>, callBack: () => Promise<R>, options: string[]): Promise<R> {
        return new Promise(async (resolve, reject) => {

            let validationResults: ValidationResult[] = [];
            let result: ValidationResult | R;
            for (let index = 0; index < options.length; index++) {
                result = await this.checkFor(options[index], param);
                validationResults.push(result as ValidationResult);
            }

            if (validationResults.find((v, i, _) => v.result == ProcessReult.failure))
                reject(validationResults);
            else {
                try {
                    result = await callBack();
                    resolve(result as R);
                } catch (errors) {
                    // the err object may be of type ValidationResult list, so we should reject it without any further
                    // which happen in case we call data source function inside another data source function

                    if (Array.isArray(errors) && errors.every(error => error instanceof ValidationResult))
                        reject(errors)
                    // resolve for database errors from basic method
                    reject([ValidationResult.buildDatabaseError()]);
                }
            }
        });
    }

    abstract checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult>

    checkForCore<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult;
            try {
                switch (validationCase) {
                    case CoreValidationCases.CAN_DO_THIS_ACTION: {
                        result = await this.coreValidator.canUserDoAction(param);
                        resolve(result);
                        break;
                    }
                    case CoreValidationCases.DATA_SOURCE_IS_UNLOCKED: {
                        result = await this.coreValidator.datasourceIsUnlocked(param)
                        resolve(result);
                        break;
                    }
                    case CoreValidationCases.HAVE_ACCESS_TO_RESOURCE: {
                        result = await this.coreValidator.haveAccessToResource(param)
                        resolve(result);
                        break;
                    }
                    case CoreValidationCases.MASTER_OR_SUBMASTER: {
                        result = await this.coreValidator.isMasterOrSubmaster(param);
                        resolve(result);
                        break;
                    }
                    case CoreValidationCases.TIME_STAMP_AUTHORIZED: {
                        result = await this.coreValidator.timeStampAuthorized(param)
                        resolve(result);
                        break;
                    }
                    case CoreValidationCases.USER_WORKS_IN_SERVICE_PROVIDER: {
                        result = await this.coreValidator.doesUserWorkInServiceProvider(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    default: {
                        resolve(ValidationResult.buildEmpty());
                    }
                }
            } catch (err) {
                // resolve for database errors from validations
                resolve(ValidationResult.buildDatabaseError())
            }
        });
    }

}
