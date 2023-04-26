import { Post } from "src/data/database/models/post";
import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { WithPermission } from "src/modules/core/data_models/entities/entity_extensions/with_permissions";
import { CommentEntity } from "src/modules/interactions/comments/data_models/entities/comment_entity";
import { ReactionEntity } from "src/modules/interactions/reactions/data_models/entities/reaction_entity";

export class PostEntity extends BaseEntity implements WithPermission {
    permissions: string[];
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare branchId: number;
    declare branch: BranchEntity;
    declare comments: CommentEntity[];
    declare reactions: ReactionEntity[];



    private constructor(
        permissions: string[],
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        branch: BranchEntity,
        branchId: number,
        comments: CommentEntity[],
        reactions: ReactionEntity[]
    ) {
        super();
        this.permissions = permissions;
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branch = branch;
        this.branchId = branchId;
        this.comments = comments;
        this.reactions = reactions;
    }

    static buildFromModel(post: Post, includes: string[]): Promise<PostEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let postEntity: PostEntity = new PostEntity(
                [],
                post.id,
                post.name,
                post.createdAt,
                post.updatedAt,
                null,
                post.branchId,
                null,
                null
            );

            resolve(postEntity)
        });
    }

    static buildListFromModel(posts: Post[], includes: string[]): Promise<PostEntity[]> {

        return new Promise(async (resolve, _) => {
            let postEntities: PostEntity[] = [];
            for (var index = 0; index < posts.length; index++) {
                postEntities.push(await PostEntity.buildFromModel(posts[index], includes));
            }
            resolve(postEntities)
        });
    }
}