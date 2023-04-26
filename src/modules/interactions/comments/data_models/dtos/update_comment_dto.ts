import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { CommentEntity } from "../entities/comment_entity";

export class UpdateCommentDTO extends BaseDTO{
    declare comment: CommentEntity;
}