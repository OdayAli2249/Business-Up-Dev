import { Injectable } from '@nestjs/common';
import { ProductDataSource } from '../product_data_source';
import { ProductValidatorsWrapper } from '../../inspectors/validators/product_validators_wrapper/product_validators_wrapper';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { Db } from 'src/data/database/db/db';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateProductDTO } from '../../data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../data_models/dtos/update_product_dto';
import { ProductEntity } from '../../data_models/entities/product_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { ProductValidationCases } from '../../helpers/constants';
import { Product } from 'src/data/database/models/products';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';
import { Op } from 'sequelize';

@Injectable()
export class ProductDataSourceImpl extends CoreValidatorImpl implements ProductDataSource {
    constructor(private readonly database: Db, private readonly productValidatorsWrapper: ProductValidatorsWrapper) {
        super()
    }
    createProduct(param: BaseParam<CreateProductDTO>): Promise<BaseCreateResponse> {
        return this.productValidatorsWrapper.validate<BaseCreateResponse, CreateProductDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createProductData = param.getData();
                    createProductData.product.branchId = param.getPathParam()['branchId'];
                    let product = await Product.create(createProductData.product);
                    resolve(BaseCreateResponse.build(product.id, CUDResponseObjects.product));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ProductValidationCases.NO_TEMPORARY_PRODUCT_CREATE_DENY,
            ])
    }
    updateProduct(param: BaseParam<UpdateProductDTO>): Promise<BaseUpdateResponse> {
        return this.productValidatorsWrapper.validate<BaseUpdateResponse, UpdateProductDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    await Product.update(param.getData().product, {
                        where: {
                            id: param.getPathParam()['productId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, CUDResponseObjects.product));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ProductValidationCases.NO_TEMPORARY_PRODUCT_UPDATE_DENY,
            ])
    }
    deleteProduct(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.productValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let product = await Product.destroy({
                        where: {
                            id: param.getPathParam()['productId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(product, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ProductValidationCases.NO_TEMPORARY_PRODUCT_DELETE_DENY,
            ])
    }
    getProducts(param: BaseParam<any>): Promise<BaseReadResponse<ProductEntity>> {
        return this.productValidatorsWrapper.validate<BaseReadResponse<ProductEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ProductEntity>>(async (resolve, reject) => {
                try {
                    let products = await Product.findAll({
                        where: {
                            branchId: param.getPathParam()['branchId']
                        }
                    })
                    resolve(BaseReadResponse.build(await ProductEntity.buildListFromModel(products, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ProductValidationCases.CAN_DISPLAY_PRODUCTS,
            ])
    }
    getProductsWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<ProductEntity>> {
        return this.productValidatorsWrapper.validate<BaseReadResponse<ProductEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ProductEntity>>(async (resolve, reject) => {
                try {
                    let getProductsPathParam = param.getPathParam();
                    let products = await Product.findAll({
                        where: {
                            branchId: getProductsPathParam['branchId']
                        }
                    });
                    let branchGroups = await PermissionGroup.findAll({ where: { branchId: getProductsPathParam['branchId'] } })
                    let productPermissions = await Permission.findAll(
                        {
                            where:
                            {
                                productId: { [Op.not]: null },
                                userId: getProductsPathParam['userId'],
                                permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id)
                            }
                        })
                    let productEntities = await ProductEntity.buildListFromModel(products, [])
                    for (var i = 0; i < productEntities.length; i++) {
                        let actionList = [];
                        for (var j = 0; j < productPermissions.length; j++) {
                            if (productPermissions[j].productId == productEntities[i].id) {
                                actionList.push(productPermissions[j].actions)
                            }
                        }
                        productEntities[i].permissions = actionList;
                    }
                    resolve(BaseReadResponse.build(productEntities));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ProductValidationCases.CAN_DISPLAY_PRODUCTS,
            ])
    }
}
