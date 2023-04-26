import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product_repository';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { ProductHandlersWrapper } from '../../inspectors/handlers/product_handlers_wrapper/product_handlers_wrapper';
import { ProductDataSourceImpl } from '../../data_source/product_data_source_impl/product_data_source_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateProductDTO } from '../../data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../data_models/dtos/update_product_dto';
import { ProductEntity } from '../../data_models/entities/product_entity';

@Injectable()
export class ProductRepositoryImpl extends CoreRepositoryImpl implements ProductRepository {
    constructor(private readonly productHandlersWrapper: ProductHandlersWrapper, private readonly productDataSource: ProductDataSourceImpl) {
        super()
    }
    createProduct(param: BaseParam<CreateProductDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.productHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.productDataSource.createProduct(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateProduct(param: BaseParam<UpdateProductDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.productHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.productDataSource.updateProduct(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteProduct(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.productHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.productDataSource.deleteProduct(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getProducts(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ProductEntity>>> {
        return this.productHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ProductEntity>;
                try {
                    response = await this.productDataSource.getProducts(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getProductsWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ProductEntity>>> {
        return this.productHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ProductEntity>;
                try {
                    response = await this.productDataSource.getProductsWithPermissions(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
