import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { AddNewUsersToBranchDTO } from "../../data_models/dtos/add_new_users_to_branch_dto";
import { BranchesWithUsersDTO } from "../../data_models/dtos/branches_with_users_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class BranchValidator {

    // for them being added to branch for the first time, users should have pending HR
    abstract isUsersInPendingHiringRequests(param: BaseParam<AddNewUsersToBranchDTO>): Promise<ValidationResult>;

    abstract noSourceAndTargetUsersIntersection(param: BaseParam<BranchesWithUsersDTO>): Promise<ValidationResult>;

    abstract usersAreInTheirCorrectBranches(param: BaseParam<BranchesWithUsersDTO>): Promise<ValidationResult>;

    abstract canDisplayBranches(param:  BaseParam<any>): Promise<ValidationResult>;

    abstract isUsersNewToServiceProvider(param:  BaseParam<any>): Promise<ValidationResult>;

}