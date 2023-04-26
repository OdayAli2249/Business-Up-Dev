import { Reply } from "src/data/database/models/reply";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";

export class ReplyEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare user: UserEntity;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;
    declare commentId: number;

    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
        serviceProviderId: number,
        serviceProvider: ServiceProviderEntity,
        commentId: number) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.serviceProviderId = serviceProviderId;
        this.serviceProvider = serviceProvider;
        this.commentId = commentId;
    }

    static buildFromModel(reply: Reply, includes: string[]): Promise<ReplyEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let replyEntity: ReplyEntity = new ReplyEntity(
                reply.id,
                reply.name,
                reply.createdAt,
                reply.updatedAt,
                reply.userId,
                reply.serviceProviderId,
                null,
                reply.commentId
            );

            resolve(replyEntity)
        });
    }

    static buildListFromModel(replies: Reply[], includes: string[]): Promise<ReplyEntity[]> {

        return new Promise(async (resolve, _) => {
            let replyEntities: ReplyEntity[] = [];
            for (var index = 0; index < replies.length; index++) {
                replyEntities.push(await ReplyEntity.buildFromModel(replies[index], includes));
            }
            resolve(replyEntities)
        });
    }
}