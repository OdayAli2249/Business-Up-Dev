import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { OrderItem } from "./order_item";
import { User } from "./user";

class Order extends Model<InferAttributes<Order, { omit: 'orderItems' }>, InferCreationAttributes<Order, { omit: 'orderItems' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;

    declare getOrderItems: HasManyGetAssociationsMixin<OrderItem>;
    declare addOrderItem: HasManyAddAssociationMixin<OrderItem, number>;
    declare addOrderItems: HasManyAddAssociationsMixin<OrderItem, number>;
    declare setOrderItems: HasManySetAssociationsMixin<OrderItem, number>;
    declare removeOrderItem: HasManyRemoveAssociationMixin<OrderItem, number>;
    declare removeOrderItems: HasManyRemoveAssociationsMixin<OrderItem, number>;
    declare hasOrderItem: HasManyHasAssociationMixin<OrderItem, number>;
    declare hasOrderItems: HasManyHasAssociationsMixin<OrderItem, number>;
    declare countOrderItems: HasManyCountAssociationsMixin;
    declare createOrderItem: HasManyCreateAssociationMixin<OrderItem, 'orderId'>;

    declare orderItems?: NonAttribute<OrderItem[]>;

    declare static associations: {
        orderItems: Association<Order, OrderItem>;
    };

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Order.init(
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
                tableName: TablesName.ORDERS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Order.belongsTo(models[ModelsName.USERS], {
            foreignKey: ForeignKeys.USER,
            onDelete: 'CASCADE'
        });
        Order.hasMany(models[ModelsName.ORDER_ITEMS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.ORDER
            },
            onDelete: 'CASCADE'
        });
    }
}

export { Order }

