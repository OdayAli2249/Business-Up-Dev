import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { CommentEntity } from "../data_models/entities/comment_entity";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { UpdateCommentDTO } from "../data_models/dtos/update_comment_dto";
import { CreateCommentDTO } from "../data_models/dtos/create_comment_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class CommentDataSource {

    abstract createComment(param: BaseParam<CreateCommentDTO>): Promise<BaseCreateResponse>

    abstract updateComment(param: BaseParam<UpdateCommentDTO>): Promise<BaseUpdateResponse>

    abstract deleteComment(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getComments(param: BaseParam<any>): Promise<BaseReadResponse<CommentEntity>>

}