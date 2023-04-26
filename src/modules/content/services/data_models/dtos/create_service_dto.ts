import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ServiceEntity } from "../entities/service_entity";

export class CreateServiceDTO extends BaseDTO {
    declare service: ServiceEntity;
}