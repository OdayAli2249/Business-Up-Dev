import { Injectable } from '@nestjs/common';
import { CoreValidator } from '../core_validator';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { CoreValidationErrors } from 'src/modules/core/helpers/constants';
import { Branch } from 'src/data/database/models/branch';
import { BranchesWithUsersDTO } from 'src/modules/branches/data_models/dtos/branches_with_users_dto';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { UserServiceProviderRole } from 'src/data/database/models/user_service_provider_role';
import { CreatePostDTO } from 'src/modules/content/posts/data_models/dtos/create_post_dto';
import { UpdatePostDTO } from 'src/modules/content/posts/data_models/dtos/update_post_dto';
import { CreateProductDTO } from 'src/modules/content/products/data_models/dtos/create_product_dto';
import { CreateServiceDTO } from 'src/modules/content/services/data_models/dtos/create_service_dto';
import { UpdateProductDTO } from 'src/modules/content/products/data_models/dtos/update_product_dto';
import { UpdateServiceDTO } from 'src/modules/content/services/data_models/dtos/update_service_dto';
import { Post } from 'src/data/database/models/post';
import { Service } from 'src/data/database/models/service';
import { Product } from 'src/data/database/models/products';
import { Permission } from 'src/data/database/models/permission';

@Injectable()
export class CoreValidatorImpl implements CoreValidator {
    isMasterOrSubmaster<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let serviceProviderId: number;
            let paramPath = param.getPathParam();
            let paramData = param.getData();
            // if another data source function use this validator, we should look for service provider for this function too
            if (paramPath['serviceProviderId'])
                serviceProviderId = paramPath['serviceProviderId'] as number;       // you may need this parse in all places
            else if (paramPath['branchId']) {
                let branch = await Branch.findOne({ where: { id: paramPath['branchId'] } });
                serviceProviderId = branch.serviceProviderId;
            } else if (param instanceof BaseParam<BranchesWithUsersDTO>) {
                let branch = await Branch.findOne({
                    where: {
                        id: ((paramData as unknown) as BranchesWithUsersDTO).targetBranch
                    }
                });
                serviceProviderId = branch.serviceProviderId;
            } else {
                let permissionGroup = await PermissionGroup.findOne({
                    where: {
                        id: paramPath['permissionGroupId']
                    }
                });
                let branch = await Branch.findOne({
                    where: {
                        id: permissionGroup.branchId
                    }
                })
                serviceProviderId = branch.serviceProviderId;
            }

            let role = await UserServiceProviderRole.count({
                where: {
                    // get user id from meta data (which is id of user who is sending current request)
                    // NOT user id in query params as in data source function since this id is the id of maniplulated
                    userId: param.getMetaData().userId,
                    serviceProviderId: param.getQueryParam()['serviceProviderId'],
                    role: ['master', 'sub-master']
                }
            })
            resolve(role != 0 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    CoreValidationErrors.NEITHER_MASTER_NOR_SUBMASTER,
                    ProcessReult.failure,
                    'permission groups - branches - service provider', 'update - create - delete', {}))
        });
    }
    timeStampAuthorized<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on this for now, maybe will be in future 
            resolve(ValidationResult.buildSuccess())
        });
    }
    haveAccessToResource<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on this for now, maybe will be in future 
            resolve(ValidationResult.buildSuccess())
        });
    }
    datasourceIsUnlocked<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on this for now, maybe will be in future 
            resolve(ValidationResult.buildSuccess())
        });
    }
    canUserDoAction<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let actions: string = '000';
            let isPost = false;
            let isProduct = false;
            let isService = false;
            let branchId: number;
            let paramPath = param.getPathParam();
            if (param instanceof BaseParam<CreatePostDTO>) {
                actions = '100';
                branchId = paramPath['branchId'] as number;
            }
            if (param instanceof BaseParam<UpdatePostDTO>) {
                actions = '010';
                isPost = true;
                branchId = ((param as unknown) as BaseParam<UpdatePostDTO>).getData().post.branchId;
            }
            if (param instanceof BaseParam<CreateProductDTO>) {
                actions = '100';
                branchId = paramPath['branchId'] as number;
            }
            if (param instanceof BaseParam<UpdateProductDTO>) {
                actions = '010';
                isProduct = true;
                branchId = ((param as unknown) as BaseParam<UpdateProductDTO>).getData().product.branchId;
            }
            if (param instanceof BaseParam<CreateServiceDTO>) {
                branchId = paramPath['branchId'] as number;
                actions = '100';
            }
            if (param instanceof BaseParam<UpdateServiceDTO>) {
                actions = '010';
                isService = true;
                branchId = ((param as unknown) as BaseParam<UpdateServiceDTO>).getData().service.branchId;
            }
            if (actions == '000') {

                if (paramPath['postId']) {
                    actions = '001';
                    isPost = true;
                    let post = await Post.findOne({ where: { id: paramPath['postId'] as number } })
                    branchId = post.branchId;
                } else if (paramPath['productId']) {
                    actions = '001';
                    isProduct = true;
                    let product = await Product.findOne({ where: { id: paramPath['productId'] as number } })
                    branchId = product.branchId;
                } else {
                    actions = '001';
                    isService = true;
                    let service = await Service.findOne({ where: { id: paramPath['serviceId'] as number } })
                    branchId = service.branchId;
                }
            }
            let branchIdObj = { branchId: branchId };
            let userId = param.getMetaData().userId;
            let permissionGroups = await PermissionGroup.findAll({ where: branchIdObj });
            let permssionsFilterObj = {
                userId: userId, permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id),
                postId: null, productId: null, serviceId: null
            };
            if (isPost)
                permssionsFilterObj.postId = paramPath['postId'];
            if (isProduct)
                permssionsFilterObj.productId = paramPath['productId'];
            if (isService)
                permssionsFilterObj.serviceId = paramPath['serviceId'];
            if (actions.charAt(0) == '1') {
                let permissionGroups = await PermissionGroup.findAll(
                    {
                        where: branchIdObj
                    }
                )
                let permissions = await Permission.findAll(
                    {
                        where:
                        {
                            userId: userId,
                            permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id)
                        }
                    }
                )
                if (permissions.length == 0)
                    resolve(ValidationResult.build(null,
                        CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                        ProcessReult.failure,
                        'resource',
                        'create',
                        {}))
                else {
                    console.log('_________' + permissions[0].actions + '________' + permissions.length)
                    let filteredPermissions = permissions.filter(
                        (element, index, array) => element.actions.charAt(0) == '1'
                    )
                    resolve(filteredPermissions.length == 0 ?
                        ValidationResult.build(null,
                            CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                            ProcessReult.failure,
                            'resource',
                            'create',
                            {}) :
                        ValidationResult.buildSuccess())
                }
            } else if (actions.charAt(1) == '1') {
                let permissions = await Permission.findAll({ where: permssionsFilterObj })
                if (permissions.length == 0)
                    resolve(ValidationResult.build(null,
                        CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                        ProcessReult.failure,
                        'resource',
                        'update',
                        {}))
                else {
                    console.log('_________' + permissions[0].actions + '________' + permissions.length)
                    let filteredPermissions = permissions.filter(
                        (element, index, array) => element.actions.charAt(1) == '1'
                    )
                    resolve(filteredPermissions.length == 0 ?
                        ValidationResult.build(null,
                            CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                            ProcessReult.failure,
                            'resource',
                            'update',
                            {})
                        : ValidationResult.buildSuccess())
                }
            } else {
                let permissions = await Permission.findAll({ where: permssionsFilterObj })
                if (permissions.length == 0)
                    resolve(ValidationResult.build(null,
                        CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                        ProcessReult.failure,
                        'resource',
                        'delete',
                        {}))
                else {
                    console.log('_________' + permissions[0].actions + '________' + permissions.length)
                    let filteredPermissions = permissions.filter(
                        (element, index, array) => element.actions.charAt(2) == '1'
                    )
                    resolve(filteredPermissions.length == 0 ?
                        ValidationResult.build(null,
                            CoreValidationErrors.CAN_NOT_DO_THIS_ACTION,
                            ProcessReult.failure,
                            'resource',
                            'delete',
                            {})
                        : ValidationResult.buildSuccess())
                }
            }
        });
    }
}
