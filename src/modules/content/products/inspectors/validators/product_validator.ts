import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateProductDTO } from "../../data_models/dtos/create_product_dto";
import { UpdateProductDTO } from "../../data_models/dtos/update_product_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ProductValidator {

    abstract canDisplayProducts(param: BaseParam<any>): Promise<ValidationResult>;

    abstract noTemporaryProductUpdateDeny(param: BaseParam<UpdateProductDTO>): Promise<ValidationResult>;

    abstract noTemporaryProductCreateDeny(param: BaseParam<CreateProductDTO>): Promise<ValidationResult>;

    abstract noTemporaryProductDeleteDeny(param: BaseParam<any>): Promise<ValidationResult>;

}