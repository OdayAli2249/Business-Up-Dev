import { Injectable } from '@nestjs/common';
import { BranchValidatorImpl } from '../branch_validator_impl/branch_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { BranchesWithUsersDTO } from 'src/modules/branches/data_models/dtos/branches_with_users_dto';
import { AddNewUsersToBranchDTO } from 'src/modules/branches/data_models/dtos/add_new_users_to_branch_dto';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BranchValidationCases } from 'src/modules/branches/helpers/constants';

@Injectable()
export class BranchValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly branchValidator: BranchValidatorImpl) {
        super(branchValidator)
    }


    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case BranchValidationCases.DISPLAY_BRANCHES_ALLOWED: {
                        result = await this.branchValidator.canDisplayBranches(param);
                        resolve(result);
                        break;
                    }
                    case BranchValidationCases.SOURCE_AND_TARGET_USERS_SEPARATED: {
                        result = await this.branchValidator.noSourceAndTargetUsersIntersection(
                            (param as unknown) as BaseParam<BranchesWithUsersDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case BranchValidationCases.USERS_ARE_IN_THEIR_CORRECT_BRANCHES: {
                        result = await this.branchValidator.usersAreInTheirCorrectBranches(
                            (param as unknown) as BaseParam<BranchesWithUsersDTO>
                        )
                        resolve(result);
                        break;
                    }
                    case BranchValidationCases.USERS_ARE_NEW_TO_SERVICE_PROVIDER: {
                        result = await this.branchValidator.isUsersNewToServiceProvider(
                            (param as unknown) as BaseParam<AddNewUsersToBranchDTO>
                        );
                        resolve(result);
                        break;
                    }
                    case BranchValidationCases.USERS_IN_PENDING_HIRING_REQUESTS: {
                        result = await this.branchValidator.isUsersInPendingHiringRequests(
                            (param as unknown) as BaseParam<AddNewUsersToBranchDTO>
                        );

                        resolve(result);
                        break;
                    }
                    // TO DO validate:  1- BranchValidationCases.NO_MASTER_OR_SUB_MASTER_USERS_IN_SOURCE_BRANCHES,
                    //                  2- BranchValidationCases.NO_USERS_WILL_BE_REMOVED_FROM_ENTIRE_SERVICE_PROVIDER
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
