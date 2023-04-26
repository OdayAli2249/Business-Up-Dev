import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { OrderEntity } from "../data_models/entities/order_entity";
import { OrderItemEntity } from "../data_models/entities/order_item_entity";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { UpdateOrderDTO } from "../data_models/dtos/update_order_dto";
import { CreateOrderDTO } from "../data_models/dtos/create_order_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class OrderDataSource {

    abstract createOrder(param: BaseParam<CreateOrderDTO>): Promise<BaseCreateResponse>

    abstract updateOrder(param: BaseParam<UpdateOrderDTO>): Promise<BaseUpdateResponse>

    abstract deleteOrder(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getOrders(param: BaseParam<any>): Promise<BaseReadResponse<OrderEntity>>

    abstract getOrderItems(param: BaseParam<any>): Promise<BaseReadResponse<OrderItemEntity>>

}