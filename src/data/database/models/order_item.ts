import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Order } from "./order";
import { Product } from "./products";
import { Service } from "./service";

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare orderId: ForeignKey<Order['id']>;
    declare productId: ForeignKey<Product['id']>;
    declare serviceId: ForeignKey<Service['id']>;

    getProduct(): Promise<Product> {              // TO DO add filtering maybe
        return new Promise(async (resolve, _) => {
            let product: Product = await Product.findOne({ where: { id: this.productId } })
            resolve(product);
        })
    }

    getService(): Promise<Service> {              // TO DO add filtering maybe
        return new Promise(async (resolve, _) => {
            let service: Service = await Service.findOne({ where: { id: this.serviceId } })
            resolve(service);
        })
    }


    static initialize(sequelize: Sequelize): NonAttribute<void> {
        OrderItem.init(
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
                tableName: TablesName.ORDER_ITEMS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) { }
}

export { OrderItem }

