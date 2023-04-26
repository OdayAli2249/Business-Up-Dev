import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { UpdateOrderDTO } from "../../data_models/dtos/update_order_dto";
import { CreateOrderDTO } from "../../data_models/dtos/create_order_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class OrderValidator {

    abstract noOrderCreationBlocked(param: BaseParam<CreateOrderDTO>): Promise<ValidationResult>;

    abstract canUpdateOrder(param: BaseParam<UpdateOrderDTO>): Promise<ValidationResult>;
    
    abstract canCancelOrder(param: BaseParam<any>): Promise<ValidationResult>;

    abstract noOrderDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult>;

}