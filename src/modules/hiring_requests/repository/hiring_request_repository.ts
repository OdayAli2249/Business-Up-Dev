import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { HiringRequestEntity } from "../data_models/entities/hiring_request_entity";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";

export abstract class HiringRequestRepository {

    abstract createHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseCreateResponse>>

    abstract rejectHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>>

    abstract cancelHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getUserHiringRequests(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<HiringRequestEntity>>>

    abstract getPendingServiceProvidertHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<HiringRequestEntity>>>

 }