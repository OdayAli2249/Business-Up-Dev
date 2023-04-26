import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BranchEntity } from "../data_models/entities/branch_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { AddNewUsersToBranchDTO } from "../data_models/dtos/add_new_users_to_branch_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BranchesWithUsersDTO } from "../data_models/dtos/branches_with_users_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class BranchDataSource {

    abstract getBranches(param: BaseParam<any>): Promise<BaseReadResponse<BranchEntity>>

    // no need for  this since it is getBranches with users filter
    // abstract getUserBranches(param: BaseParam<any>): Promise<BaseReadResponse<BranchEntity>>

    abstract getBrancheUsers(param: BaseParam<any>): Promise<BaseReadResponse<UserEntity>>

    abstract addNewUsersToBranch(param: BaseParam<AddNewUsersToBranchDTO>): Promise<BaseCreateResponse>

    abstract addExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseCreateResponse>

    abstract removeExistedUsersFromBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseDeleteResponse>

    abstract transferExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseUpdateResponse>

}