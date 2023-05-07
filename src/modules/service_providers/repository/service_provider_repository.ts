import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateServiceProviderDTO } from "../data_models/dtos/create_service_provider_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ServiceProviderEntity } from "../data_models/entities/service_provider_entity";
import { RemoveUsersFromServiceProviderDTO } from "../data_models/dtos/remove_users_from_service_provider_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";

export abstract class ServiceProviderRepository {

    abstract createServiceProvider(param: BaseParam<CreateServiceProviderDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract getServiceProviders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceProviderEntity>>>

    abstract geteUserServiceProviders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceProviderEntity>>>

    abstract removeUserFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<FailureOr<BaseDeleteResponse>>

    abstract addSubMasterUser(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>>

    abstract removeSubMasterUser(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>>

}