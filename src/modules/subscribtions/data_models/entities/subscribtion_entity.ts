import { Subscribtion } from "src/data/database/models/subscribtion";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { SubscribtionIncludes } from "../../helpers/constants";

export class SubscribtionEntity extends BaseEntity {
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

    static buildFromModel(subscribtion: Subscribtion, includes: string[]): Promise<SubscribtionEntity> {
        return new Promise(async (resolve, _) => {
            let userEntity: UserEntity;
            if (includes.find((include, index, arr) => include == SubscribtionIncludes.USER)) {
                userEntity = await UserEntity.buildFromModel(await subscribtion.getUser(), includes);
                // TO DO net more includes maybe
            }

            let serviceProviderEntity: ServiceProviderEntity;
            if (includes.find((include, index, arr) => include == SubscribtionIncludes.SERVICE_PROVIDER)) {
                serviceProviderEntity = await ServiceProviderEntity.buildFromModel(await subscribtion.getServiceProvider(), includes);   // TO DO net more includes maybe
            }

            // TO DO : add more conditions for more includes

            let subscribtionEntity: SubscribtionEntity = new SubscribtionEntity(
                subscribtion.id,
                subscribtion.name,
                subscribtion.createdAt,
                subscribtion.updatedAt,
                subscribtion.serviceProviderId,
                serviceProviderEntity,
                subscribtion.userId,
                userEntity
            );

            resolve(subscribtionEntity)
        });
    }

    static buildListFromModel(subscribtions: Subscribtion[], includes: string[]): Promise<SubscribtionEntity[]> {

        return new Promise(async (resolve, _) => {
            let subscribtionEntities: SubscribtionEntity[] = [];
            for (var index = 0; index < subscribtions.length; index++) {
                subscribtionEntities.push(await SubscribtionEntity.buildFromModel(subscribtions[index], includes));
            }
            resolve(subscribtionEntities)
        });
    }
}