import { BaseParam } from "src/modules/core/data_models/params/base_param";
import { CreateProductDTO } from "../data_models/dtos/create_product_dto";
import { BaseUpdateResponse } from "src/modules/core/data_models/responses/base_update_response";
import { BaseCreateResponse } from "src/modules/core/data_models/responses/base_create_response";
import { BaseDeleteResponse } from "src/modules/core/data_models/responses/base_delete_response";
import { UpdateProductDTO } from "../data_models/dtos/update_product_dto";
import { BaseReadResponse } from "src/modules/core/data_models/responses/base_read_response";
import { ProductEntity } from "../data_models/entities/product_entity";
import { FailureOr } from "src/modules/core/data_models/failure_or";

export abstract class ProductRepository {
    abstract createProduct(param: BaseParam<CreateProductDTO>): Promise<FailureOr<BaseCreateResponse>>

    abstract updateProduct(param: BaseParam<UpdateProductDTO>): Promise<FailureOr<BaseUpdateResponse>>

    abstract deleteProduct(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>>

    abstract getProducts(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ProductEntity>>>

    abstract getProductsWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ProductEntity>>>
}