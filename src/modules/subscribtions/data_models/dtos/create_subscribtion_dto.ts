import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { SubscribtionEntity } from "../entities/subscribtion_entity";

export class CreateSubscribtionDTO extends BaseDTO{
    declare subscribtion: SubscribtionEntity;
}