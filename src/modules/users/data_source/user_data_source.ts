import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { CreateUserDTO } from "../data_models/dtos/create_user_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { UserEntity } from "../data_models/entities/user_entity";
import { UpdateUserDTO } from "../data_models/dtos/update_user_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class UserDataSource {
    abstract createUser(param: BaseParam<CreateUserDTO>): Promise<BaseCreateResponse>

    abstract updateUser(param: BaseParam<UpdateUserDTO>): Promise<BaseUpdateResponse>

    abstract deleteUser(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getUser(param: BaseParam<any>): Promise<BaseReadResponse<UserEntity>>
}