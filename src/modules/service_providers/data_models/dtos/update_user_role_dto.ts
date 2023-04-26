import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";

export class RemoveUsersFromServiceProviderDTO extends BaseDTO{
    declare serviceProviderId: number;
    declare userId: number;
}