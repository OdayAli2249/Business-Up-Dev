import { Reaction } from "src/data/database/models/reaction";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";

export class ReactionEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;
    declare postId: number;
    declare serviceId: number;


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
        serviceProviderId: number,
        serviceProvider: ServiceProviderEntity,
        postId: number,
        serviceId: number) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.serviceProviderId = serviceProviderId;
        this.serviceProvider = serviceProvider;
        this.postId = postId;
        this.serviceId = serviceId;
    }

    static buildFromModel(reaction: Reaction, includes: string[]): Promise<ReactionEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let reactionEntity: ReactionEntity = new ReactionEntity(
                reaction.id,
                reaction.name,
                reaction.createdAt,
                reaction.updatedAt,
                reaction.userId,
                reaction.serviceProviderId,
                null,
                reaction.postId,
                reaction.serviceId
            );

            resolve(reactionEntity)
        });
    }

    static buildListFromModel(reactions: Reaction[], includes: string[]): Promise<ReactionEntity[]> {

        return new Promise(async (resolve, _) => {
            let reactionEntities: ReactionEntity[] = [];
            for (var index = 0; index < reactions.length; index++) {
                reactionEntities.push(await ReactionEntity.buildFromModel(reactions[index], includes));
            }
            resolve(reactionEntities)
        });
    }
}