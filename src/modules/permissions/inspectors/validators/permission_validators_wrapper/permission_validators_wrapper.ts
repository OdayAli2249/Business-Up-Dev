import { Injectable } from '@nestjs/common';
import { PermissionValidatorImpl } from '../permission_validator_impl/permission_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { PermissionGroupValidationCases } from 'src/modules/permissions/helpers/constants';
import { CreatePermissionGroupDTO } from 'src/modules/permissions/data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from 'src/modules/permissions/data_models/dtos/update_permission_group_dto';

@Injectable()
export class PermissionValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly permissionValidator: PermissionValidatorImpl) {
        super(permissionValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case PermissionGroupValidationCases.NO_TEMPORARY_CUD_OPERATIONS_DENY: {
                        result = await this.permissionValidator.noTemporaryCUDOperationsDeny(param);
                        resolve(result);
                        break;
                    }
                    case PermissionGroupValidationCases.RESOURCES_ARE_IN_THEIR_CORRECT_BRANCHES: {
                        result = await this.permissionValidator.resourcesAreInTheirCorrectBranches(
                            (param as unknown) as BaseParam<UpdatePermissionGroupDTO | CreatePermissionGroupDTO>
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
