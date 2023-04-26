import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { Comment } from "./comment";
import { Reaction } from "./reaction";
import { User } from "./user";

class Post extends Model<InferAttributes<Post, { omit: 'comments' | 'reactions' }>, InferCreationAttributes<Post, { omit: 'comments' | 'reactions' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare branchId: ForeignKey<Branch['id']>;

    declare getComments: HasManyGetAssociationsMixin<Comment>;
    declare addComment: HasManyAddAssociationMixin<Comment, number>;
    declare addComments: HasManyAddAssociationsMixin<Comment, number>;
    declare setComments: HasManySetAssociationsMixin<Comment, number>;
    declare removeComment: HasManyRemoveAssociationMixin<Comment, number>;
    declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>;
    declare hasComment: HasManyHasAssociationMixin<Comment, number>;
    declare hasComments: HasManyHasAssociationsMixin<Comment, number>;
    declare countComments: HasManyCountAssociationsMixin;
    declare createComment: HasManyCreateAssociationMixin<Comment, 'postId'>;

    declare comments?: NonAttribute<Comment[]>;

    declare getReactions: HasManyGetAssociationsMixin<Reaction>;
    declare addReaction: HasManyAddAssociationMixin<Reaction, number>;
    declare addReactions: HasManyAddAssociationsMixin<Reaction, number>;
    declare setReactions: HasManySetAssociationsMixin<Reaction, number>;
    declare removeReaction: HasManyRemoveAssociationMixin<Reaction, number>;
    declare removeReactions: HasManyRemoveAssociationsMixin<Reaction, number>;
    declare hasReaction: HasManyHasAssociationMixin<Reaction, number>;
    declare hasReactions: HasManyHasAssociationsMixin<Reaction, number>;
    declare countReactions: HasManyCountAssociationsMixin;
    declare createReaction: HasManyCreateAssociationMixin<Reaction, 'postId'>;

    declare reactions?: NonAttribute<Reaction[]>;

    declare static associations: {
        comments: Association<Post, Comment>;
        reactions: Association<Post, Reaction>;
    };


    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Post.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: new DataTypes.STRING(128),
                    allowNull: false
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: TablesName.POSTS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Post.belongsTo(models[ModelsName.BRANCHES], { foreignKey: ForeignKeys.BRANCHE });
        Post.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER });
        Post.hasMany(models[ModelsName.COMMENTS], { foreignKey: ForeignKeys.POST });
        Post.hasMany(models[ModelsName.REACTIONS], { foreignKey: ForeignKeys.POST });
        Post.hasMany(models[ModelsName.PERMISSIONS], { foreignKey: ForeignKeys.POST });
    }
}

export { Post }

