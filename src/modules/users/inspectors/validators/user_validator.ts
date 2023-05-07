import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { UpdateUserDTO } from "../../data_models/dtos/update_user_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class UserValidator {

        abstract isUpdateProfileTimeStampAuthorized(param: BaseParam<UpdateUserDTO>): Promise<ValidationResult>;

        abstract canDeleteUser(param: BaseParam<any>): Promise<ValidationResult>;

}