import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { UpdateOrderDTO } from "../data_models/dtos/update_order_dto";
import { CreateOrderDTO } from "../data_models/dtos/create_order_dto";
import { FailureOr } from "src/modules/core/data_models/failure_or";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { OrderItemEntity } from "../data_models/entities/order_item_entity";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { OrderEntity } from "../data_models/entities/order_entity";

export abstract class OrderRepository {

    abstract createOrder(param: BaseParam<CreateOrderDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateOrder(param: BaseParam<UpdateOrderDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteOrder(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getOrders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<OrderEntity>>>

    abstract getOrderItems(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<OrderItemEntity>>>

}