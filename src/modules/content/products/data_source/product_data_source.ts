import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ProductEntity } from "../data_models/entities/product_entity";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { UpdateProductDTO } from "../data_models/dtos/update_product_dto";
import { CreateProductDTO } from "../data_models/dtos/create_product_dto";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ProductDataSource {
    abstract createProduct(param: BaseParam<CreateProductDTO>): Promise<BaseCreateResponse>

    abstract updateProduct(param: BaseParam<UpdateProductDTO>): Promise<BaseUpdateResponse>

    abstract deleteProduct(param: BaseParam<any>): Promise<BaseDeleteResponse>

    abstract getProducts(param: BaseParam<any>): Promise<BaseReadResponse<ProductEntity>>

    abstract getProductsWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<ProductEntity>>
}