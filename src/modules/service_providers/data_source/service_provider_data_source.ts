import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { CreateServiceProviderDTO } from "../data_models/dtos/create_service_provider_dto";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ServiceProviderEntity } from "../data_models/entities/service_provider_entity";
import { RemoveUsersFromServiceProviderDTO } from "../data_models/dtos/remove_users_from_service_provider_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ServiceProviderDataSource {

    abstract createServiceProvider(param: BaseParam<CreateServiceProviderDTO>): Promise<BaseCreateResponse>

    abstract getServiceProviders(param: BaseParam<any>): Promise<BaseReadResponse<ServiceProviderEntity>>

    abstract geteUserServiceProviders(param: BaseParam<any>): Promise<BaseReadResponse<ServiceProviderEntity>>

    abstract removeUserFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<BaseDeleteResponse>

    abstract addSubMasterUser(param: BaseParam<any>): Promise<BaseUpdateResponse>

    abstract removeSubMasterUser(param: BaseParam<any>): Promise<BaseUpdateResponse>

    abstract addMasterUser(param: BaseParam<any>): Promise<BaseUpdateResponse>

    abstract giveUpMasterRole(param: BaseParam<any>): Promise<BaseUpdateResponse>

}