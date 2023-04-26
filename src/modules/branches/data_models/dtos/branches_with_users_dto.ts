import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { BranchEntity } from "../entities/branch_entity";

export class BranchesWithUsersDTO extends BaseDTO {
    declare sourceBranches: BranchEntity[];
    declare targetBranch: number;
}