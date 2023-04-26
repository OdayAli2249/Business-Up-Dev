import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { CreateReactionDTO } from "../data_models/dtos/create_reaction_dto";
import { UpdateReactionDTO } from "../data_models/dtos/update_reaction_dto";
import { ReactionEntity } from "../data_models/entities/reaction_entity";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ReactionDataSource {

    abstract createReaction(param: BaseParam<CreateReactionDTO>): Promise<BaseCreateResponse>

    abstract updateReaction(param: BaseParam<UpdateReactionDTO>): Promise<BaseUpdateResponse>

    abstract deleteReaction(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getReactions(param: BaseParam<any>): Promise<BaseReadResponse<ReactionEntity>>

}