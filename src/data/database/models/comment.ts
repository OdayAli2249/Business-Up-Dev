import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Post } from "./post";
import { Reply } from "./reply";
import { Service } from "./service";
import { ServiceProvider } from "./service_provider";
import { User } from "./user";

class Comment extends Model<InferAttributes<Comment, { omit: 'replies' }>, InferCreationAttributes<Comment, { omit: 'replies' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;
    declare postId: ForeignKey<Post['id']>;
    declare serviceId: ForeignKey<Service['id']>;

    declare getReplies: HasManyGetAssociationsMixin<Reply>;
    declare addReply: HasManyAddAssociationMixin<Reply, number>;
    declare addReplies: HasManyAddAssociationsMixin<Reply, number>;
    declare setReplies: HasManySetAssociationsMixin<Reply, number>;
    declare removeReply: HasManyRemoveAssociationMixin<Reply, number>;
    declare removeReplies: HasManyRemoveAssociationsMixin<Reply, number>;
    declare hasReply: HasManyHasAssociationMixin<Reply, number>;
    declare hasReplies: HasManyHasAssociationsMixin<Reply, number>;
    declare countReplies: HasManyCountAssociationsMixin;
    declare createReply: HasManyCreateAssociationMixin<Reply, 'commentId'>;

    declare replies?: NonAttribute<Reply[]>;

    declare static associations: {
        replies: Association<Comment, Reply>;
    };

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Comment.init(
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
                tableName: TablesName.COMMENTS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Comment.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER, onDelete: 'CASCADE' });
        Comment.belongsTo(models[ModelsName.SERVICE_PROVIDERS], { foreignKey: ForeignKeys.SERVICE_PROVIDER, onDelete: 'CASCADE' });
        Comment.belongsTo(models[ModelsName.POSTS], { foreignKey: ForeignKeys.POST, onDelete: 'CASCADE' });
        Comment.belongsTo(models[ModelsName.SERVICES], { foreignKey: ForeignKeys.SERVICE, onDelete: 'CASCADE' });
        Comment.hasMany(models[ModelsName.REPLIES], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.COMMENT
            },
            onDelete: 'CASCADE'
        });
    }
}

export { Comment }

