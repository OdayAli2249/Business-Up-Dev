import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BranchEntity } from "../data_models/entities/branch_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { AddNewUsersToBranchDTO } from "../data_models/dtos/add_new_users_to_branch_dto";
import { BranchesWithUsersDTO } from "../data_models/dtos/branches_with_users_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class BranchRepository {
    abstract getBranches(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<BranchEntity>>>

    abstract getBrancheUsers(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<UserEntity>>>

    abstract addNewUsersToBranch(param: BaseParam<AddNewUsersToBranchDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract addExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract removeExistedUsersFromBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseDeleteResponse>>

    abstract transferExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseUpdateResponse>>
}