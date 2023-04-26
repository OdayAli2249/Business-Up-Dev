import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { CommentEntity } from "../entities/comment_entity";

export class CreateCommentDTO extends BaseDTO{

    // you can know weither the id in path param is serviceId or post id from endpoint
    // optional service provider id is inside comment entity
    declare comment: CommentEntity;
}