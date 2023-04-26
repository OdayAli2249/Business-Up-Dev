import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { CreateReplyDTO } from "../data_models/dtos/create_reply_dto";
import { UpdateReplyDTO } from "../data_models/dtos/update_reply_dto";
import { ReplyEntity } from "../data_models/entities/reply_entity";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ReplyDataSource {

    abstract createReply(param: BaseParam<CreateReplyDTO>): Promise<BaseCreateResponse>

    abstract updateReply(param: BaseParam<UpdateReplyDTO>): Promise<BaseUpdateResponse>

    abstract deleteReply(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getReplies(param: BaseParam<any>): Promise<BaseReadResponse<ReplyEntity>>

}