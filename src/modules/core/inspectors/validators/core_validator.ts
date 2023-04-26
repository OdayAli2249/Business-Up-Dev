import { BaseDTO } from "../../data_models/dtos/base_dto";
import { BaseParam } from "../../data_models/params/base_param";
import { ValidationResult } from "../../data_models/validation_result";

export abstract class CoreValidator {

    abstract isMasterOrSubmaster(param: BaseParam<any>): Promise<ValidationResult>

    // all data for validation can be fetched from base param: query param, path param, user meta | and in update there is body so 'any' will be filled
    // just in controller maybe we need to add resource type (known from endpoint) to query params map
    abstract canUserDoAction(param: BaseParam<any>): Promise<ValidationResult>

    abstract timeStampAuthorized<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult>;

    abstract haveAccessToResource<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult>;

    abstract datasourceIsUnlocked<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult>;

}