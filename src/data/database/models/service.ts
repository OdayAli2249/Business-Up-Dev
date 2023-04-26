import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { Comment } from "./comment";
import { OrderItem } from "./order_item";
import { Reaction } from "./reaction";
import { User } from "./user";

class Service extends Model<InferAttributes<Service, { omit: 'comments' | 'reactions' | 'orderItems' }>, InferCreationAttributes<Service, { omit: 'comments' | 'reactions' | 'orderItems' }>> implements BaseModel {
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
    declare createComment: HasManyCreateAssociationMixin<Comment, 'serviceId'>;

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
    declare createReaction: HasManyCreateAssociationMixin<Reaction, 'serviceId'>;

    declare reactions?: NonAttribute<Reaction[]>;

    declare getOrderItems: HasManyGetAssociationsMixin<OrderItem>;
    declare addOrderItem: HasManyAddAssociationMixin<OrderItem, number>;
    declare addOrderItems: HasManyAddAssociationsMixin<OrderItem, number>;
    declare setOrderItems: HasManySetAssociationsMixin<OrderItem, number>;
    declare removeOrderItem: HasManyRemoveAssociationMixin<OrderItem, number>;
    declare removeOrderItems: HasManyRemoveAssociationsMixin<OrderItem, number>;
    declare hasOrderItem: HasManyHasAssociationMixin<OrderItem, number>;
    declare hasOrderItems: HasManyHasAssociationsMixin<OrderItem, number>;
    declare countOrderItems: HasManyCountAssociationsMixin;
    declare createOrderItem: HasManyCreateAssociationMixin<OrderItem, 'serviceId'>;

    declare orderItems?: NonAttribute<OrderItem[]>;

    declare static associations: {
        comments: Association<Service, Comment>;
        reactions: Association<Service, Reaction>;
        orderItems: Association<Service, OrderItem>;
    };


    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Service.init(
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
                tableName: TablesName.SERVICES,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Service.belongsTo(models[ModelsName.BRANCHES], { foreignKey: ForeignKeys.BRANCHE });
        Service.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER });
        Service.hasMany(models[ModelsName.COMMENTS], { foreignKey: ForeignKeys.SERVICE });
        Service.hasMany(models[ModelsName.REACTIONS], { foreignKey: ForeignKeys.SERVICE });
        Service.hasMany(models[ModelsName.ORDER_ITEMS], { foreignKey: ForeignKeys.SERVICE });
        Service.hasMany(models[ModelsName.PERMISSIONS], { foreignKey: ForeignKeys.SERVICE });
    }
}

export { Service }

