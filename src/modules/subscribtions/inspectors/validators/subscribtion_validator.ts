import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateSubscribtionDTO } from "../../data_models/dtos/create_subscribtion_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class SubscribtionValidator {

    abstract notAlreadySubscribed(param: BaseParam<CreateSubscribtionDTO>): Promise<ValidationResult>;

}