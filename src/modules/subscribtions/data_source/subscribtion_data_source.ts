import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { SubscribtionEntity } from "../data_models/entities/subscribtion_entity";
import { CreateSubscribtionDTO } from "../data_models/dtos/create_subscribtion_dto";
import { UpdateSubscribtionDTO } from "../data_models/dtos/update_subscribtion_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class SubscribtionDataSource {

    abstract createSubscribtion(param: BaseParam<CreateSubscribtionDTO>): Promise<BaseCreateResponse>

    abstract updateSubscribtion(param: BaseParam<UpdateSubscribtionDTO>): Promise<BaseUpdateResponse>

    abstract deleteSubscribtion(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getSubscribtions(param: BaseParam<any>): Promise<BaseReadResponse<SubscribtionEntity>>

}