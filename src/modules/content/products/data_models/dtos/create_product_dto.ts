import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ProductEntity } from "../entities/product_entity";

export class CreateProductDTO extends BaseDTO{
    declare product: ProductEntity;
}