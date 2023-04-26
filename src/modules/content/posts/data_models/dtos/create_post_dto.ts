import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { PostEntity } from "../entities/post_entity";

export class CreatePostDTO extends BaseDTO {
    declare post: PostEntity;
}