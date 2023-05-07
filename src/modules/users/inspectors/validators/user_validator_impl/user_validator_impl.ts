import { Injectable } from '@nestjs/common';
import { UserValidator } from '../user_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { UpdateUserDTO } from 'src/modules/users/data_models/dtos/update_user_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class UserValidatorImpl extends CoreValidatorImpl implements UserValidator {
    constructor(private readonly database: Db) {
        super()
    }
    canDeleteUser(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            resolve(ValidationResult.buildSuccess())
        });
    }
    isUpdateProfileTimeStampAuthorized(param: BaseParam<UpdateUserDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on user update for now, maybe will be in future 
            resolve(ValidationResult.buildSuccess())
        });
    }
}
