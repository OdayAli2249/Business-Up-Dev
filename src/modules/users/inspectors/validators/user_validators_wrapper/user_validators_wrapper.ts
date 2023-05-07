import { Injectable } from '@nestjs/common';
import { UserValidatorImpl } from '../user_validator_impl/user_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { UserValidationCases } from 'src/modules/users/helpers/constants';
import { UpdateUserDTO } from 'src/modules/users/data_models/dtos/update_user_dto';

@Injectable()
export class UserValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly userValidator: UserValidatorImpl) {
        super(userValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case UserValidationCases.UPDATE_PROFILE_TIME_STAMP_AUTHORIZED: {
                        result = await this.userValidator.isUpdateProfileTimeStampAuthorized(
                            (param as unknown) as BaseParam<UpdateUserDTO>
                        );
                        resolve(result);
                        break;
                    }
                    case UserValidationCases.CAN_DELETE_USER: {
                        result = await this.userValidator.canDeleteUser(
                            param
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
