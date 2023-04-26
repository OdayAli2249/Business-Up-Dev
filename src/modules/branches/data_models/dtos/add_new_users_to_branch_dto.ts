import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";

export class AddNewUsersToBranchDTO extends BaseDTO {
    declare users: number[];
}