import { Comment } from "src/data/database/models/comment";
import { PostEntity } from "src/modules/content/posts/data_models/entities/post_entity";
import { ServiceEntity } from "src/modules/content/services/data_models/entities/service_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ReplyEntity } from "src/modules/interactions/replies/data_models/entities/reply_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";

export class CommentEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare user: UserEntity;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;
    declare postId: number;
    declare post: PostEntity;
    declare serviceId: number;
    declare service: ServiceEntity;
    declare replies: ReplyEntity[];

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

    static buildFromModel(comment: Comment, includes: string[]): Promise<CommentEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let commentEntity: CommentEntity = new CommentEntity(
                comment.id,
                comment.name,
                comment.createdAt,
                comment.updatedAt,
                comment.userId,
                comment.serviceProviderId,
                null,
                comment.postId,
                comment.serviceId
            );

            resolve(commentEntity)
        });
    }

    static buildListFromModel(comments: Comment[], includes: string[]): Promise<CommentEntity[]> {

        return new Promise(async (resolve, _) => {
            let commentEntities: CommentEntity[] = [];
            for (var index = 0; index < comments.length; index++) {
                commentEntities.push(await CommentEntity.buildFromModel(comments[index], includes));
            }
            resolve(commentEntities)
        });
    }
}