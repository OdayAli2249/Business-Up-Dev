import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { CommentEntity } from "src/modules/interactions/comments/data_models/entities/comment_entity";
import { ReactionEntity } from "src/modules/interactions/reactions/data_models/entities/reaction_entity";
import { ReplyEntity } from "src/modules/interactions/replies/data_models/entities/reply_entity";
import { OrderEntity } from "src/modules/orders/data_models/entities/order_entity";
import { SubscribtionEntity } from "src/modules/subscribtions/data_models/entities/subscribtion_entity";
import { UserRoleEntity } from "./user_role_entity";
import { User } from "src/data/database/models/user";
import { UserIncludes } from "../enums/user_includes";

export class UserEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare firstName: string;
    declare lastName: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare comments: CommentEntity[];
    declare reactions: ReactionEntity[];
    declare replies: ReplyEntity[];
    declare orders: OrderEntity[];
    declare subscribtions: SubscribtionEntity[];
    declare branches: BranchEntity[];
    declare roles: UserRoleEntity[];


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        firstName: string,
        lastName: string,
        comments: CommentEntity[],
        reactions: ReactionEntity[],
        replies: ReplyEntity[],
        orders: OrderEntity[],
        subscribtions: SubscribtionEntity[],
        branches: BranchEntity[],
        roles: UserRoleEntity[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.comments = comments;
        this.reactions = reactions;
        this.replies = replies;
        this.orders = orders;
        this.subscribtions = subscribtions;
        this.branches = branches;
        this.roles = roles;
    }

    static buildFromModel(user: User, includes: string[]): Promise<UserEntity> {

        // TO DO : includes fetching code

        return new Promise(async (resolve, _) => {
            let userEntity: UserEntity = new UserEntity(
                user.id,
                user.name,
                user.createdAt,
                user.updatedAt,
                user.firstName,
                user.lastName,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            resolve(userEntity)
        });
    }

    static buildListFromModel(users: User[], includes: string[]): Promise<UserEntity[]> {
        return new Promise(async (resolve, _) => {
            let userEntities: UserEntity[] = [];
            for (var index = 0; index < users.length; index++) {
                userEntities.push(await UserEntity.buildFromModel(users[index], includes));
            }
            resolve(userEntities)
        });
    }
}