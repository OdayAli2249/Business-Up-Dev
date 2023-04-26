import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateCommentDTO } from "../data_models/dtos/create_comment_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { UpdateCommentDTO } from "../data_models/dtos/update_comment_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { CommentEntity } from "../data_models/entities/comment_entity";

export abstract class CommentRepository {

    abstract createComment(param: BaseParam<CreateCommentDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateComment(param: BaseParam<UpdateCommentDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteComment(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getComments(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<CommentEntity>>>

}