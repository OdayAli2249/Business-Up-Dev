import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { UserEntity } from "../entities/user_entity";

export class CreateUserDTO extends BaseDTO{
    declare user: UserEntity;
}