import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { HiringRequestEntity } from "../entities/hiring_request_entity";

export class CreateHiringRequestDTO extends BaseDTO{
    declare data: HiringRequestEntity;
}