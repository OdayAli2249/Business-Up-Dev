import { Service } from "src/data/database/models/service";
import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { WithPermission } from "src/modules/core/data_models/entities/entity_extensions/with_permissions";
import { CommentEntity } from "src/modules/interactions/comments/data_models/entities/comment_entity";
import { ReactionEntity } from "src/modules/interactions/reactions/data_models/entities/reaction_entity";
import { OrderItemEntity } from "src/modules/orders/data_models/entities/order_item_entity";
import { ServiceIncludes } from "../../helpers/constants";
import { PermissionGroup } from "src/data/database/models/permission_group";
import { Permission } from "src/data/database/models/permission";

export class ServiceEntity extends BaseEntity implements WithPermission {
    permissions: string[];
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare branch: BranchEntity;
    declare branchId: number;
    declare comments: CommentEntity[];
    declare reactions: ReactionEntity[];
    declare orderItems: OrderItemEntity[];

    private constructor(
        permissions: string[],
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        branch: BranchEntity,
        branchId: number,
        comments: CommentEntity[],
        reactions: ReactionEntity[],
        orderItems: OrderItemEntity[]
    ) {
        super();
        this.permissions = permissions;
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branch = branch;
        this.branchId = branchId;
        this.comments = comments;
        this.reactions = reactions;
        this.orderItems = orderItems;
    }

    static buildFromModel(service: Service, includes: string[]): Promise<ServiceEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let serviceEntity: ServiceEntity = new ServiceEntity(
                [],
                service.id,
                service.name,
                service.createdAt,
                service.updatedAt,
                null,
                service.branchId,
                null,
                null,
                null
            );

            resolve(serviceEntity)
        });
    }

    static buildListFromModel(services: Service[], includes: string[]): Promise<ServiceEntity[]> {

        return new Promise(async (resolve, _) => {
            let serviceEntities: ServiceEntity[] = [];
            for (var index = 0; index < services.length; index++) {
                serviceEntities.push(await ServiceEntity.buildFromModel(services[index], includes));
            }
            resolve(serviceEntities)
        });
    }
}