import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { CreateServiceDTO } from "../data_models/dtos/create_service_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { UpdateServiceDTO } from "../data_models/dtos/update_service_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ServiceEntity } from "../data_models/entities/service_entity";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ServiceDataSource {

    abstract createService(param: BaseParam<CreateServiceDTO>): Promise<BaseCreateResponse>

    abstract updateService(param: BaseParam<UpdateServiceDTO>): Promise<BaseUpdateResponse>

    abstract deleteService(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getServices(param: BaseParam<any>): Promise<BaseReadResponse<ServiceEntity>>

    abstract getServicesWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<ServiceEntity>>

}