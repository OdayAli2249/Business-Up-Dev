import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { UserEntity } from "../entities/user_entity";

export class UpdateUserDTO extends BaseDTO{
    declare user: UserEntity;
}