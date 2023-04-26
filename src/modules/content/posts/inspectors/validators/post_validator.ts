import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { UpdatePostDTO } from "../../data_models/dtos/update_post_dto";
import { CreatePostDTO } from "../../data_models/dtos/create_post_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class PostValidator {

    abstract canDisplayPosts(param: BaseParam<any>): Promise<ValidationResult>;

    abstract noTemporaryPostUpdateDeny(param: BaseParam<UpdatePostDTO>): Promise<ValidationResult>;

    abstract noTemporaryPostCreateDeny(param: BaseParam<CreatePostDTO>): Promise<ValidationResult>;

    abstract noTemporaryPostDeleteDeny(param: BaseParam<any>): Promise<ValidationResult>;

}