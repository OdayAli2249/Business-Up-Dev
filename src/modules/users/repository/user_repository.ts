import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateUserDTO } from "../data_models/dtos/create_user_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { UpdateUserDTO } from "../data_models/dtos/update_user_dto";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { UserEntity } from "../data_models/entities/user_entity";

export abstract class UserRepository {
    abstract createUser(param: BaseParam<CreateUserDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateUser(param: BaseParam<UpdateUserDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteUser(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getUser(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<UserEntity>>>
}