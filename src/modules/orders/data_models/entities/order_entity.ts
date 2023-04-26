import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { OrderItemEntity } from "./order_item_entity";
import { OrderIncludes } from "../../helpers/constants";
import { Order } from "src/data/database/models/order";

export class OrderEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare user: UserEntity;
    declare orderItems: OrderItemEntity[];


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
        user: UserEntity,
        orderItems: OrderItemEntity[]) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.user = user;
        this.orderItems = orderItems;
    }

    static buildFromModel(order: Order, includes: string[]): Promise<OrderEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let orderEntity: OrderEntity = new OrderEntity(
                order.id,
                order.name,
                order.createdAt,
                order.updatedAt,
                order.userId,
                null,
                null
            );

            resolve(orderEntity)
        });
    }

    static buildListFromModel(orders: Order[], includes: string[]): Promise<OrderEntity[]> {

        return new Promise(async (resolve, _) => {
            let orderEntities: OrderEntity[] = [];
            for (var index = 0; index < orders.length; index++) {
                orderEntities.push(await OrderEntity.buildFromModel(orders[index], includes));
            }
            resolve(orderEntities)
        });
    }
}