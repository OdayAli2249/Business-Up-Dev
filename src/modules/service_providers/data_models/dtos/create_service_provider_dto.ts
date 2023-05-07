import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { ServiceProviderEntity } from "../entities/service_provider_entity";
import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";

export class CreateServiceProviderDTO extends BaseDTO{
    declare serviceProvider: ServiceProviderEntity;
    // do not forget to add service provider id here
    declare branches: BranchEntity[]; 
 }