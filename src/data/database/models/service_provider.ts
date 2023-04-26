import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { Comment } from "./comment";
import { Reaction } from "./reaction";
import { Reply } from "./reply";
import { Subscribtion } from "./subscribtion";

class ServiceProvider extends Model<InferAttributes<ServiceProvider, { omit: 'branches' | 'comments' | 'reactions' | 'replies' | 'subscribtions' }>, InferCreationAttributes<ServiceProvider, { omit: 'branches' | 'comments' | 'reactions' | 'replies' | 'subscribtions' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // declare getBranches: HasManyGetAssociationsMixin<Branch>;
    declare addBranch: HasManyAddAssociationMixin<Branch, number>;
    declare addBranches: HasManyAddAssociationsMixin<Branch, number>;
    declare setBranches: HasManySetAssociationsMixin<Branch, number>;
    declare removeBranch: HasManyRemoveAssociationMixin<Branch, number>;
    declare removeBranches: HasManyRemoveAssociationsMixin<Branch, number>;
    declare hasBranch: HasManyHasAssociationMixin<Branch, number>;
    declare hasBranches: HasManyHasAssociationsMixin<Branch, number>;
    declare countBranches: HasManyCountAssociationsMixin;
    declare createBranch: HasManyCreateAssociationMixin<Branch, 'serviceProviderId'>;

    declare branches?: NonAttribute<Comment[]>;
    getBranches(): Promise<Branch[]> {
        return new Promise(async (resolve, _) => {
            resolve(await Branch.findAll({ where: { serviceProviderId: this.id } }));
        })
    }

    declare getComments: HasManyGetAssociationsMixin<Comment>;
    declare addComment: HasManyAddAssociationMixin<Comment, number>;
    declare addComments: HasManyAddAssociationsMixin<Comment, number>;
    declare setComments: HasManySetAssociationsMixin<Comment, number>;
    declare removeComment: HasManyRemoveAssociationMixin<Comment, number>;
    declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>;
    declare hasComment: HasManyHasAssociationMixin<Comment, number>;
    declare hasComments: HasManyHasAssociationsMixin<Comment, number>;
    declare countComments: HasManyCountAssociationsMixin;
    declare createComment: HasManyCreateAssociationMixin<Comment, 'serviceProviderId'>;

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
    declare createReaction: HasManyCreateAssociationMixin<Reaction, 'serviceProviderId'>;

    declare reactions?: NonAttribute<Reaction[]>;

    declare getReplies: HasManyGetAssociationsMixin<Reply>;
    declare addReply: HasManyAddAssociationMixin<Reply, number>;
    declare addReplies: HasManyAddAssociationsMixin<Reply, number>;
    declare setReplies: HasManySetAssociationsMixin<Reply, number>;
    declare removeReply: HasManyRemoveAssociationMixin<Reply, number>;
    declare removeReplies: HasManyRemoveAssociationsMixin<Reply, number>;
    declare hasReply: HasManyHasAssociationMixin<Reply, number>;
    declare hasReplies: HasManyHasAssociationsMixin<Reply, number>;
    declare countReplies: HasManyCountAssociationsMixin;
    declare createReply: HasManyCreateAssociationMixin<Reply, 'serviceProviderId'>;

    declare replies?: NonAttribute<Reply[]>;

    declare getSubscribtions: HasManyGetAssociationsMixin<Subscribtion>;
    declare addSubscribtion: HasManyAddAssociationMixin<Subscribtion, number>;
    declare addSubscribtions: HasManyAddAssociationsMixin<Subscribtion, number>;
    declare setSubscribtions: HasManySetAssociationsMixin<Subscribtion, number>;
    declare removeSubscribtion: HasManyRemoveAssociationMixin<Subscribtion, number>;
    declare removeSubscribtions: HasManyRemoveAssociationsMixin<Subscribtion, number>;
    declare hasSubscribtion: HasManyHasAssociationMixin<Subscribtion, number>;
    declare hasSubscribtions: HasManyHasAssociationsMixin<Subscribtion, number>;
    declare countSubscribtions: HasManyCountAssociationsMixin;
    declare createSubscribtion: HasManyCreateAssociationMixin<Subscribtion, 'serviceProviderId'>;

    declare subscribtions?: NonAttribute<Subscribtion[]>;

    declare static associations: {
        branches: Association<ServiceProvider, Branch>;
        comments: Association<ServiceProvider, Comment>;
        reactions: Association<ServiceProvider, Reaction>;
        replies: Association<ServiceProvider, Reply>;
        subscribtions: Association<ServiceProvider, Subscribtion>;
    };


    static initialize(sequelize: Sequelize): NonAttribute<void> {
        ServiceProvider.init(
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
                tableName: TablesName.SERVICE_PROVIDERS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        ServiceProvider.belongsToMany(models[ModelsName.USERS], { through: models[ModelsName.SUBSCRIBTIONS], foreignKey: ForeignKeys.SERVICE_PROVIDER });
        ServiceProvider.belongsToMany(models[ModelsName.USERS], { through: models[ModelsName.HIRING_REQUESTS], foreignKey: ForeignKeys.SERVICE_PROVIDER });
        ServiceProvider.belongsToMany(models[ModelsName.USERS], { through: models[ModelsName.USER_SERVICE_PROVIDER_ROLES], foreignKey: ForeignKeys.SERVICE_PROVIDER });
        ServiceProvider.hasMany(models[ModelsName.BRANCHES], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.SERVICE_PROVIDER
            }
        });
        ServiceProvider.hasMany(models[ModelsName.COMMENTS], { foreignKey: ForeignKeys.SERVICE_PROVIDER });
        ServiceProvider.hasMany(models[ModelsName.REACTIONS], { foreignKey: ForeignKeys.SERVICE_PROVIDER });
        ServiceProvider.hasMany(models[ModelsName.REPLIES], { foreignKey: ForeignKeys.SERVICE_PROVIDER });
    }
}

export { ServiceProvider }

