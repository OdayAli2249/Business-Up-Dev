import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateCommentDTO } from "../../data_models/dtos/create_comment_dto";
import { UpdateCommentDTO } from "../../data_models/dtos/update_comment_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class CommentValidator {

    abstract noCommentCreationBlocked(param: BaseParam<CreateCommentDTO>): Promise<ValidationResult>

    abstract canUpdateComment(param: BaseParam<UpdateCommentDTO>): Promise<ValidationResult>

    abstract canDeleteComment(param: BaseParam<any>): Promise<ValidationResult>

    abstract noCommentsDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult>

}