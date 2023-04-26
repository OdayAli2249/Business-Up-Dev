import { Model } from "sequelize";
import { Branch } from "src/data/database/models/branch";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { ServiceProviderEntity } from "src/modules/service_providers/data_models/entities/service_provider_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";
import { BranchIncludes } from "../../helpers/constants";

export class BranchEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare serviceProviderId: number;
    declare serviceProvider: ServiceProviderEntity;
    declare users: UserEntity[];
    declare userIds: number[];

    private constructor(id: number, name: string, createdAt: Date, updatedAt: Date, serviceProviderId: number, users: UserEntity[]) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.serviceProviderId = serviceProviderId;
        this.users = users
    }

    static buildFromModel(branch: Branch, includes: string[]): Promise<BranchEntity> {
        return new Promise(async (resolve, _) => {
            let userEntities: UserEntity[];
            if (includes.find((include, index, arr) => include == BranchIncludes.USERS)) {
                userEntities = await UserEntity.buildListFromModel(await branch.getUsers(), includes);   // TO DO net more includes maybe
            }

            // TO DO : add more conditions for more includes

            let branchEntity: BranchEntity = new BranchEntity(
                branch.id,
                branch.name,
                branch.createdAt,
                branch.updatedAt,
                branch.serviceProviderId,
                userEntities
            );

            resolve(branchEntity)
        });
    }

    static buildListFromModel(branches: Branch[], includes: string[]): Promise<BranchEntity[]> {

        return new Promise(async (resolve, _) => {
            let branchEntities: BranchEntity[] = [];
            for (var index = 0; index < branches.length; index++) {
                branchEntities.push(await BranchEntity.buildFromModel(branches[index], includes));
            }
            resolve(branchEntities)
        });
    }
}