import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { CreatePostDTO } from "../data_models/dtos/create_post_dto";
import { UpdatePostDTO } from "../data_models/dtos/update_post_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { PostEntity } from "../data_models/entities/post_entity";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class PostDataSource {

    abstract createPost(param: BaseParam<CreatePostDTO>): Promise<BaseCreateResponse>

    abstract updatePost(param: BaseParam<UpdatePostDTO>): Promise<BaseUpdateResponse>

    abstract deletePost(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getPosts(param: BaseParam<any>): Promise<BaseReadResponse<PostEntity>>

    abstract getPostsWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<PostEntity>>

}