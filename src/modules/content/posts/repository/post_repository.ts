import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { UpdatePostDTO } from "../data_models/dtos/update_post_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { CreatePostDTO } from "../data_models/dtos/create_post_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { PostEntity } from "../data_models/entities/post_entity";
import { FailureOr } from "src/modules/core/data_models/failure_or";

export abstract class PostRepository {
    abstract createPost(param: BaseParam<CreatePostDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updatePost(param: BaseParam<UpdatePostDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deletePost(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getPosts(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PostEntity>>>

    abstract getPostsWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PostEntity>>>
}