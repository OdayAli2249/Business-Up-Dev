import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreatePermissionGroupDTO } from "../data_models/dtos/create_permission_group_dto";
import { UpdatePermissionGroupDTO } from "../data_models/dtos/update_permission_group_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { PermissionGroupEntity } from "../data_models/entities/permission_group_entity";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";

export abstract class PermissionRepository {

    abstract createPermissionGroup(param: BaseParam<CreatePermissionGroupDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updatePermissionGroup(param: BaseParam<UpdatePermissionGroupDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deletePermissionGroup(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getPermissionGroups(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PermissionGroupEntity>>>

}