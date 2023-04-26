import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ReactionEntity } from "../entities/reaction_entity";

export class CreateReactionDTO extends BaseDTO{
    declare reaction: ReactionEntity;
}