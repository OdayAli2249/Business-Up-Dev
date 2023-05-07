import { Injectable } from '@nestjs/common';
import { CoreValidator } from '../core_validator';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { Actions, CoreValidationErrors } from 'src/modules/core/helpers/constants';
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
import { HiringRequest } from 'src/data/database/models/hiring_request';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';

@Injectable()
export class CoreValidatorImpl implements CoreValidator {
    // issue #1
    // this kind of validator that contain dirty code and if-else statment... is dirty because
    // of the fact that this validator is used by multiple data source functions across the application,
    // and since every data source function's param contain data - needed for the validator - in different
    // locations in param object (or maybe different param object type), the navigation stretegy will vary
    // accordingly. and here where dirty code will be appear in the scene.
    // we may improve this part of architecture in future. 
    isMasterOrSubmaster<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let serviceProviderId: number;
            let paramPath = param.getPathParam();
            let paramData = param.getData();
            // if another data source function use this validator, we should look for service provider for this function too
            if (paramPath && paramPath['serviceProviderId'])
                serviceProviderId = paramPath['serviceProviderId'] as number;       // you may need this parse in all places
            else if (paramPath && paramPath['branchId']) {
                let branch = await Branch.findOne({ where: { id: paramPath['branchId'] } });
                serviceProviderId = branch.serviceProviderId;
            } else if (paramPath && paramPath['permissionGroupId']) {
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
            } else if (paramPath && paramPath['hiringRequestId']) {
                let hiringRequest = await HiringRequest.findOne({ where: { id: paramPath['hiringRequestId'] } });
                serviceProviderId = hiringRequest.serviceProviderId;
            } else if (paramPath && paramPath['postId']) {
                let post = await Post.findOne({ where: { id: paramPath['postId'] } });
                let branch = await Branch.findOne({
                    where: {
                        id: post.branchId
                    }
                })
                serviceProviderId = branch.serviceProviderId;
            } else if (paramPath && paramPath['productId']) {
                let product = await Product.findOne({ where: { id: paramPath['productId'] } });
                let branch = await Branch.findOne({
                    where: {
                        id: product.branchId
                    }
                })
                serviceProviderId = branch.serviceProviderId;
            } else if (paramPath && paramPath['serviceId']) {
                let service = await Service.findOne({ where: { id: paramPath['serviceId'] } });
                let branch = await Branch.findOne({
                    where: {
                        id: service.branchId
                    }
                })
                serviceProviderId = branch.serviceProviderId;
            }
            else {
                let branch = await Branch.findOne({
                    where: {
                        id: ((paramData as unknown) as BranchesWithUsersDTO).sourceBranches[0].id
                    }
                });
                serviceProviderId = branch.serviceProviderId;
            }

            let role = await UserServiceProviderRole.count({
                where: {
                    // get user id from meta data (which is id of user who is sending current request)
                    // NOT user id in query params as in data source function since this id is the id of maniplulated
                    userId: param.getMetaData().userId,
                    serviceProviderId: serviceProviderId,
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
            let result = await this.isMasterOrSubmaster(param);
            if (result.result == ProcessReult.success)
                resolve(ValidationResult.buildSuccess())

            else {
                let actions: string = '000';
                let isPost = false;
                let isProduct = false;
                let isService = false;
                let branchId: number;
                let paramPath = param.getPathParam();
                let metadata = param.getMetaData();
                if (metadata.request.action == Actions.CREATE &&
                    metadata.request.object == CUDResponseObjects.post) {
                    actions = '100';
                    branchId = paramPath['branchId'] as number;
                }
                if (metadata.request.action == Actions.UPDATE &&
                    metadata.request.object == CUDResponseObjects.post) {
                    actions = '010';
                    isPost = true;
                    let post = await Post.findOne({ where: { id: paramPath['postId'] as number } })
                    branchId = post.branchId;
                }
                if (metadata.request.action == Actions.CREATE &&
                    metadata.request.object == CUDResponseObjects.product) {
                    actions = '100';
                    branchId = paramPath['branchId'] as number;
                }
                if (metadata.request.action == Actions.UPDATE &&
                    metadata.request.object == CUDResponseObjects.product) {
                    actions = '010';
                    isProduct = true;
                    let product = await Product.findOne({ where: { id: paramPath['productId'] as number } })
                    branchId = product.branchId;
                }
                if (metadata.request.action == Actions.CREATE &&
                    metadata.request.object == CUDResponseObjects.service) {
                    branchId = paramPath['branchId'] as number;
                    actions = '100';
                }
                if (metadata.request.action == Actions.UPDATE &&
                    metadata.request.object == CUDResponseObjects.service) {
                    actions = '010';
                    isService = true;
                    let service = await Service.findOne({ where: { id: paramPath['serviceId'] as number } })
                    branchId = service.branchId;
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
            }
        });
    }

    doesUserWorkInServiceProvider<T extends BaseDTO>(param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // TO DO implement this validator
            // this validator used for checking if user currently sending request is working in  certain service
            // provider. we use this validator in two situations: when we try to remove user from service
            // provider and when user try to interact with resource as service provider.
            // if we are going to implement this validator, we should analyse the param since the needed
            // service provider id location in param could be found in different location depend on request.
            // note: we should consider issue #1 here
            // in case of interacting with resource as service provider: knowing where the service provider id
            // in params, we check if there is service provider id, if there is not, we just pass and #buildSuccess.
            resolve(ValidationResult.buildSuccess())
        });
    }
}