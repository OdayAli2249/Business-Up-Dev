import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";

export class UserRoleEntity extends BaseEntity{
    declare id: number;
    declare role: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;
}