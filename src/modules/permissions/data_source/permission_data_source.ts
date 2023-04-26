import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { CreatePermissionGroupDTO } from "../data_models/dtos/create_permission_group_dto";
import { UpdatePermissionGroupDTO } from "../data_models/dtos/update_permission_group_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { PermissionGroupEntity } from "../data_models/entities/permission_group_entity";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class PermissionDataSource {

    abstract createPermissionGroup(param: BaseParam<CreatePermissionGroupDTO>): Promise<BaseCreateResponse>

    abstract updatePermissionGroup(param: BaseParam<UpdatePermissionGroupDTO>): Promise<BaseUpdateResponse>

    abstract deletePermissionGroup(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getPermissionGroups(param: BaseParam<any>): Promise<BaseReadResponse<PermissionGroupEntity>>

}

