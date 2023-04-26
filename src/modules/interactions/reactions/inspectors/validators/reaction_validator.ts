import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateReactionDTO } from "../../data_models/dtos/create_reaction_dto";
import { UpdateReactionDTO } from "../../data_models/dtos/update_reaction_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ReactionValidator {

    abstract noReactionCreationBlocked(param: BaseParam<CreateReactionDTO>): Promise<ValidationResult>

    abstract canUpdateReaction(param: BaseParam<UpdateReactionDTO>): Promise<ValidationResult>

    abstract canDeleteReaction(param: BaseParam<any>): Promise<ValidationResult>

    abstract noReactionsDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult>

}