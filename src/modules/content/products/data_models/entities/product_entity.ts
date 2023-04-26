import { Product } from "src/data/database/models/products";
import { BranchEntity } from "src/modules/branches/data_models/entities/branch_entity";
import { BaseEntity } from "src/modules/core/data_models/entities/base_entity";
import { WithPermission } from "src/modules/core/data_models/entities/entity_extensions/with_permissions";
import { OrderItemEntity } from "src/modules/orders/data_models/entities/order_item_entity";

export class ProductEntity extends BaseEntity implements WithPermission {
    permissions: string[];
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare branchId: number;
    declare branch: BranchEntity;
    declare orderItems: OrderItemEntity[];

    private constructor(
        permissions: string[],
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        branch: BranchEntity,
        branchId: number,
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
        this.orderItems = orderItems;
    }

    static buildFromModel(product: Product, includes: string[]): Promise<ProductEntity> {
        return new Promise(async (resolve, _) => {

            // TO DO : add more conditions for more includes

            let serviceEntity: ProductEntity = new ProductEntity(
                [],
                product.id,
                product.name,
                product.createdAt,
                product.updatedAt,
                null,
                product.branchId,
                null,
            );

            resolve(serviceEntity)
        });
    }

    static buildListFromModel(products: Product[], includes: string[]): Promise<ProductEntity[]> {

        return new Promise(async (resolve, _) => {
            let productEntities: ProductEntity[] = [];
            for (var index = 0; index < products.length; index++) {
                productEntities.push(await ProductEntity.buildFromModel(products[index], includes));
            }
            resolve(productEntities)
        });
    }
}