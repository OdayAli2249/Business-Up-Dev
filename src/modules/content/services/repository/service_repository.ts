import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateServiceDTO } from "../data_models/dtos/create_service_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { UpdateServiceDTO } from "../data_models/dtos/update_service_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ServiceEntity } from "../data_models/entities/service_entity";
import { FailureOr } from "src/modules/core/data_models/failure_or";

export abstract class ServiceRepository {
    abstract createService(param: BaseParam<CreateServiceDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateService(param: BaseParam<UpdateServiceDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteService(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getServices(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceEntity>>>

    abstract getServicesWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceEntity>>>
}