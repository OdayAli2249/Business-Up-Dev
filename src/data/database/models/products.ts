import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { OrderItem } from "./order_item";
import { User } from "./user";

class Product extends Model<InferAttributes<Product, { omit: 'orderItems' }>, InferCreationAttributes<Product, { omit: 'orderItems' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare branchId: ForeignKey<Branch['id']>;

    declare getOrderItems: HasManyGetAssociationsMixin<OrderItem>;
    declare addOrderItem: HasManyAddAssociationMixin<OrderItem, number>;
    declare addOrderItems: HasManyAddAssociationsMixin<OrderItem, number>;
    declare setOrderItems: HasManySetAssociationsMixin<OrderItem, number>;
    declare removeOrderItem: HasManyRemoveAssociationMixin<OrderItem, number>;
    declare removeOrderItems: HasManyRemoveAssociationsMixin<OrderItem, number>;
    declare hasOrderItem: HasManyHasAssociationMixin<OrderItem, number>;
    declare hasOrderItems: HasManyHasAssociationsMixin<OrderItem, number>;
    declare countOrderItems: HasManyCountAssociationsMixin;
    declare createOrderItem: HasManyCreateAssociationMixin<OrderItem, 'productId'>;

    declare orderItems?: NonAttribute<OrderItem[]>;

    declare static associations: {
        orderItems: Association<Product, OrderItem>;
    };

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Product.init(
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
                tableName: TablesName.PRODUCTS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Product.belongsTo(models[ModelsName.BRANCHES], { foreignKey: ForeignKeys.BRANCHE });
        Product.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER });
        Product.hasMany(models[ModelsName.ORDER_ITEMS], { foreignKey: ForeignKeys.PRODUCT });
        Product.hasMany(models[ModelsName.PERMISSIONS], { foreignKey: ForeignKeys.PRODUCT });
    }
}

export { Product }

