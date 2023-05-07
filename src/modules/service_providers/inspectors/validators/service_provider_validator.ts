import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateServiceProviderDTO } from "../../data_models/dtos/create_service_provider_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { RemoveUsersFromServiceProviderDTO } from "../../data_models/dtos/remove_users_from_service_provider_dto";

export abstract class ServiceProviderValidator {

    abstract isMaster(param: BaseParam<any>): Promise<ValidationResult>

    abstract isNotTheOnlyMasterInServiceProvider(param: BaseParam<any>): Promise<ValidationResult>;

    abstract doesUserWorkInServiceProvider(param: BaseParam<any>): Promise<ValidationResult>;

    abstract notexceedMaximumServiceProvidersNumber(param: BaseParam<CreateServiceProviderDTO>): Promise<ValidationResult>;

    abstract canRemoveUserFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<ValidationResult>;

}