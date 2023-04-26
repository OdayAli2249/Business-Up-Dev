import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateReactionDTO } from "../data_models/dtos/create_reaction_dto";
import { UpdateReactionDTO } from "../data_models/dtos/update_reaction_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ReactionEntity } from "../data_models/entities/reaction_entity";

export abstract class ReactionRepository {

    abstract createReaction(param: BaseParam<CreateReactionDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateReaction(param: BaseParam<UpdateReactionDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteReaction(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getReactions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ReactionEntity>>>

}