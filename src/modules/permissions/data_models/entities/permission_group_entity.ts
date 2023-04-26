import { Permission } from "src/data/database/models/permission";
import { PermissionGroup } from "src/data/database/models/permission_group";
import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { PostEntity } from "src/modules/content/posts/data_models/entities/post_entity";
import { ProductEntity } from "src/modules/content/products/data_models/entities/product_entity";
import { ServiceEntity } from "src/modules/content/services/data_models/entities/service_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { UserEntity } from "src/modules/users/data_models/entities/user_entity";

export class PermissionGroupEntity extends BaseEntity {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare branchId: number;
    declare branch: BranchEntity;
    declare actions: string;
    declare userIds: number[];
    declare postIds: number[];
    declare serviceIds: number[];
    declare productIds: number[];
    declare users: UserEntity[];
    declare posts: PostEntity[];
    declare services: ServiceEntity[];
    declare products: ProductEntity[];


    private constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        branchId: number,
        branch: BranchEntity,
        actions: string,
        userIds: number[],
        postIds: number[],
        serviceIds: number[],
        productIds: number[],
        users: UserEntity[],
        posts: PostEntity[],
        services: ServiceEntity[],
        products: ProductEntity[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branchId = branchId;
        this.branch = branch;
        this.actions = actions;
        this.userIds = userIds;
        this.postIds = postIds;
        this.serviceIds = serviceIds;
        this.productIds = productIds;
        this.users = users;
        this.posts = posts;
        this.services = services;
        this.products = products;
    }

    static buildFromModel(permissionGroup: PermissionGroup, includes: string[]): Promise<PermissionGroupEntity> {
        return new Promise(async (resolve, _) => {
            let userIds = [];
            let postIds = [];
            let serviceIds = [];
            let productIds = [];

            let permissions = await Permission.findAll({ where: { permissionGroupId: permissionGroup.id } });

            for (var index = 0; index < permissions.length; index++) {
                userIds.push(permissions[index].userId);
                if (permissions[index].postId)
                    postIds.push(permissions[index].postId);
                if (permissions[index].serviceId)
                    serviceIds.push(permissions[index].serviceId);
                if (permissions[index].productId)
                    productIds.push(permissions[index].productId);
            }

            // TO DO : add more conditions for more includes

            let permissionGroupEntity: PermissionGroupEntity = new PermissionGroupEntity(
                permissionGroup.id,
                permissionGroup.name,
                permissionGroup.createdAt,
                permissionGroup.updatedAt,
                permissionGroup.branchId,
                null,
                null,        // actions is null for now
                userIds,
                postIds,
                serviceIds,
                productIds,
                null,
                null,
                null,
                null
            );

            resolve(permissionGroupEntity)
        });
    }

    static buildListFromModel(permissionGroups: PermissionGroup[], includes: string[]): Promise<PermissionGroupEntity[]> {

        return new Promise(async (resolve, _) => {
            let permissionGroupsEntities: PermissionGroupEntity[] = [];
            for (var index = 0; index < permissionGroups.length; index++) {
                permissionGroupsEntities.push(await PermissionGroupEntity.buildFromModel(permissionGroups[index], includes));
            }
            resolve(permissionGroupsEntities)
        });
    }

}