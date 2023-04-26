import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { PermissionGroupEntity } from "../entities/permission_group_entity";

export class CreatePermissionGroupDTO extends BaseDTO{
    declare permissionGroup: PermissionGroupEntity;
}