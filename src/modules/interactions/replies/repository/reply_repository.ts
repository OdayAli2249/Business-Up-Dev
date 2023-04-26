import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateReplyDTO } from "../data_models/dtos/create_reply_dto";
import { UpdateReplyDTO } from "../data_models/dtos/update_reply_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ReplyEntity } from "../data_models/entities/reply_entity";

export abstract class ReplyRepository {

    abstract createReply(param: BaseParam<CreateReplyDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateReply(param: BaseParam<UpdateReplyDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteReply(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getReplies(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ReplyEntity>>>

}