import { HiringRequest } from "src/data/database/models/hiring_request";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { HiringRequestIncludes } from "../../helpers/constant";

export class HiringRequestEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userId: number;
    declare user: UserEntity;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        serviceProviderId: number,
        serviceProvider: ServiceProviderEntity,
        userId: number,
        user: UserEntity) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.serviceProviderId = serviceProviderId;
        this.serviceProvider = serviceProvider;
        this.userId = userId;
        this.user = user;
    }

    static buildFromModel(hiringRequest: HiringRequest, includes: string[]): Promise<HiringRequestEntity> {
        return new Promise(async (resolve, _) => {
            let userEntity: UserEntity;
            if (includes.find((include, index, arr) => include == HiringRequestIncludes.USER)) {
                userEntity = await UserEntity.buildFromModel(await hiringRequest.getUser(), includes);
                // TO DO net more includes maybe
            }

            let serviceProviderEntity: ServiceProviderEntity;
            if (includes.find((include, index, arr) => include == HiringRequestIncludes.SERVICE_PROVIDER)) {
                serviceProviderEntity = await ServiceProviderEntity.buildFromModel(await hiringRequest.getServiceProvider(), includes);   // TO DO net more includes maybe
            }

            // TO DO : add more conditions for more includes

            let hiringRequestEntity: HiringRequestEntity = new HiringRequestEntity(
                hiringRequest.id,
                hiringRequest.name,
                hiringRequest.createdAt,
                hiringRequest.updatedAt,
                hiringRequest.serviceProviderId,
                serviceProviderEntity,
                hiringRequest.userId,
                userEntity
            );

            resolve(hiringRequestEntity)
        });
    }

    static buildListFromModel(hiringRequests: HiringRequest[], includes: string[]): Promise<HiringRequestEntity[]> {

        return new Promise(async (resolve, _) => {
            let HiringRequestEntities: HiringRequestEntity[] = [];
            for (var index = 0; index < hiringRequests.length; index++) {
                HiringRequestEntities.push(await HiringRequestEntity.buildFromModel(hiringRequests[index], includes));
            }
            resolve(HiringRequestEntities)
        });
    }
}