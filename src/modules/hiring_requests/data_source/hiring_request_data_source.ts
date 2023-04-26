import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { HiringRequestEntity } from "../data_models/entities/hiring_request_entity";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class HiringRequestDataSource {

    abstract createHiringRequest(param: BaseParam<any>): Promise<BaseCreateResponse>

    abstract rejectHiringRequest(param: BaseParam<any>): Promise<BaseUpdateResponse>

    abstract cancelHiringRequest(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getUserHiringRequests(param: BaseParam<any>): Promise<BaseReadResponse<HiringRequestEntity>>

    abstract getPendingServiceProvidertHiringRequest(param: BaseParam<any>): Promise<BaseReadResponse<HiringRequestEntity>>

}