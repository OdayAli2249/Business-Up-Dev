import { Injectable } from '@nestjs/common';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { PermissionValidator } from '../permission_validator';
import { Db } from 'src/data/database/db/db';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreatePermissionGroupDTO } from 'src/modules/permissions/data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from 'src/modules/permissions/data_models/dtos/update_permission_group_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { UserBranch } from 'src/data/database/models/user_branch';
import { Post } from 'src/data/database/models/post';
import { Service } from 'src/data/database/models/service';
import { Product } from 'src/data/database/models/products';
import { PermissionGroupValidationErrors } from 'src/modules/permissions/helpers/constants';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { PermissionGroup } from 'src/data/database/models/permission_group';

@Injectable()
export class PermissionValidatorImpl extends CoreValidatorImpl implements PermissionValidator {
    constructor(private readonly database: Db) {
        super()
    }
    resourcesAreInTheirCorrectBranches(param: BaseParam<CreatePermissionGroupDTO | UpdatePermissionGroupDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let paramData = param.getData();
            let paramPath = param.getPathParam();
            let branchId;
            let sneakingData = { users: [], posts: [], products: [], services: [] }
            if (paramPath['permissionGroupId']) {
                let permissionGroup = await PermissionGroup.findOne({
                    where: {
                        id:
                            paramPath['permissionGroupId']
                    }
                });
                branchId = permissionGroup.branchId;
            } else { branchId = paramPath['branchId'] }
            for (var i = 0; i < paramData.permissionGroup.userIds.length; i++) {
                let res = await UserBranch.findOne({
                    where: {
                        userId: paramData.permissionGroup.userIds[i],
                        branchId: branchId
                    }
                })
                if (!res)
                    sneakingData.users.push(paramData.permissionGroup.userIds[i])
            }
            if (paramData.permissionGroup.postIds)
                for (var i = 0; i < paramData.permissionGroup.postIds.length; i++) {
                    let res = await Post.findOne({
                        where: {
                            id: paramData.permissionGroup.postIds[i],
                            branchId: branchId
                        }
                    })
                    if (!res)
                        sneakingData.posts.push(paramData.permissionGroup.postIds[i])
                }
            if (paramData.permissionGroup.serviceIds)
                for (var i = 0; i < paramData.permissionGroup.serviceIds.length; i++) {
                    let res = await Service.findOne({
                        where: {
                            id: paramData.permissionGroup.serviceIds[i],
                            branchId: branchId
                        }
                    })
                    if (!res)
                        sneakingData.services.push(paramData.permissionGroup.serviceIds[i])
                }
            if (paramData.permissionGroup.productIds)
                for (var i = 0; i < paramData.permissionGroup.productIds.length; i++) {
                    let res = await Product.findOne({
                        where:
                        {
                            id: paramData.permissionGroup.productIds[i],
                            branchId: branchId
                        }
                    })
                    if (!res)
                        sneakingData.products.push(paramData.permissionGroup.productIds[i])
                }
            resolve((sneakingData.users.length == 0 &&
                sneakingData.posts.length == 0 &&
                sneakingData.products.length == 0 &&
                sneakingData.services.length == 0)
                ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    PermissionGroupValidationErrors.RESOURCES_NOT_IN_THEIR_CORRECT_BRANCHES,
                    ProcessReult.failure,
                    'permission', 'create - update', { sneakingData }))
        });
    }
    noTemporaryCUDOperationsDeny(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            resolve(ValidationResult.buildSuccess())
        });
    }
}
