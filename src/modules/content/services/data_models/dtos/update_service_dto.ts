import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ServiceEntity } from "../entities/service_entity";

export class UpdateServiceDTO extends BaseDTO {
    declare service: ServiceEntity;
}