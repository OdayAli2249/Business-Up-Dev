import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreatePermissionGroupDTO } from "../../data_models/dtos/create_permission_group_dto";
import { UpdatePermissionGroupDTO } from "../../data_models/dtos/update_permission_group_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class PermissionValidator {

    abstract resourcesAreInTheirCorrectBranches(param: BaseParam<CreatePermissionGroupDTO | UpdatePermissionGroupDTO>): Promise<ValidationResult>;

    // on sub-master by master
    abstract noTemporaryCUDOperationsDeny(param: BaseParam<CreatePermissionGroupDTO | UpdatePermissionGroupDTO | any>): Promise<ValidationResult>;

}