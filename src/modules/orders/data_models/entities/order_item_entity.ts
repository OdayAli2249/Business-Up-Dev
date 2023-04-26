import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { OrderEntity } from "./order_entity";
import { ProductEntity } from "src/modules/content/products/data_models/entities/product_entity";
import { ServiceEntity } from "src/modules/content/services/data_models/entities/service_entity";
import { OrderItem } from "src/data/database/models/order_item";

export class OrderItemEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare orderId: number;
    declare order: OrderEntity;
    declare productId: number;
    declare product: ProductEntity;
    declare serviceId: number;
    declare service: ServiceEntity;


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        orderId: number,
        order: OrderEntity,
        productId: number,
        product: ProductEntity,
        serviceId: number,
        service: ServiceEntity
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderId = orderId;
        this.order = order;
        this.productId = productId;
        this.product = product;
        this.serviceId = serviceId;
        this.service = service;
    }

    static buildFromModel(orderItem: OrderItem, includes: string[]): Promise<OrderItemEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let orderItemEntity: OrderItemEntity = new OrderItemEntity(
                orderItem.id,
                orderItem.name,
                orderItem.createdAt,
                orderItem.updatedAt,
                orderItem.orderId,
                null,
                orderItem.productId,
                null,
                orderItem.serviceId,
                null
            );

            resolve(orderItemEntity)
        });
    }

    static buildListFromModel(orderItems: OrderItem[], includes: string[]): Promise<OrderItemEntity[]> {

        return new Promise(async (resolve, _) => {
            let orderItemEntities: OrderItemEntity[] = [];
            for (var index = 0; index < orderItems.length; index++) {
                orderItemEntities.push(await OrderItemEntity.buildFromModel(orderItems[index], includes));
            }
            resolve(orderItemEntities)
        });
    }
}