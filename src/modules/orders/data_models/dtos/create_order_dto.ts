import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { OrderEntity } from "../entities/order_entity";

export class CreateOrderDTO extends BaseDTO {
    declare order: OrderEntity;
    declare services: number[];
    declare products: number[];
}