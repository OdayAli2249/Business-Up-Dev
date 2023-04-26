import { ServiceProvider } from "src/data/database/models/service_provider";
import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { CommentEntity } from "src/modules/interactions/comments/data_models/entities/comment_entity";
import { ReactionEntity } from "src/modules/interactions/reactions/data_models/entities/reaction_entity";
import { ReplyEntity } from "src/modules/interactions/replies/data_models/entities/reply_entity";
import { SubscribtionEntity } from "src/modules/subscribtions/data_models/entities/subscribtion_entity";

export class ServiceProviderEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare subscribtions: SubscribtionEntity[];
    declare branches: BranchEntity[];
    declare comments: CommentEntity[];
    declare reactions: ReactionEntity[];
    declare replies: ReplyEntity[];


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        subscribtions: SubscribtionEntity[],
        branches: BranchEntity[],
        comments: CommentEntity[],
        reactions: ReactionEntity[],
        replies: ReplyEntity[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.subscribtions = subscribtions;
        this.branches = branches;
        this.comments = comments;
        this.reactions = reactions;
        this.replies = replies;
    }

    static buildFromModel(serviceProvider: ServiceProvider, includes: string[]): Promise<ServiceProviderEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add conditions for includes

            let serviceProviderEntity: ServiceProviderEntity = new ServiceProviderEntity(
                serviceProvider.id,
                serviceProvider.name,
                serviceProvider.createdAt,
                serviceProvider.updatedAt,
                null,
                null,
                null,
                null,
                null
            );

            resolve(serviceProviderEntity)
        });
    }

    static buildListFromModel(serviceProviders: ServiceProvider[], includes: string[]): Promise<ServiceProviderEntity[]> {

        return new Promise(async (resolve, _) => {
            let serviceProviderEntities: ServiceProviderEntity[] = [];
            for (var index = 0; index < serviceProviders.length; index++) {
                serviceProviderEntities.push(await ServiceProviderEntity.buildFromModel(serviceProviders[index], includes));
            }
            resolve(serviceProviderEntities)
        });
    }
}