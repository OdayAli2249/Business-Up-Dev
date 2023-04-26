import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateSubscribtionDTO } from "../data_models/dtos/create_subscribtion_dto";
import { UpdateSubscribtionDTO } from "../data_models/dtos/update_subscribtion_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { SubscribtionEntity } from "../data_models/entities/subscribtion_entity";

export abstract class SubscribtionRepository {

    abstract createSubscribtion(param: BaseParam<CreateSubscribtionDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateSubscribtion(param: BaseParam<UpdateSubscribtionDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteSubscribtion(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getSubscribtions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<SubscribtionEntity>>>

}