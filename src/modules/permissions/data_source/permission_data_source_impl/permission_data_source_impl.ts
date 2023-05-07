import { Injectable } from '@nestjs/common';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { PermissionDataSource } from '../permission_data_source';
import { PermissionValidatorsWrapper } from '../../inspectors/validators/permission_validators_wrapper/permission_validators_wrapper';
import { Db } from 'src/data/database/db/db';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreatePermissionGroupDTO } from '../../data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from '../../data_models/dtos/update_permission_group_dto';
import { PermissionGroupEntity } from '../../data_models/entities/permission_group_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { PermissionGroupValidationCases } from '../../helpers/constants';
import { CoreValidationCases } from 'src/modules/core/helpers/constants';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';

@Injectable()
export class PermissionDataSourceImpl extends CoreDataSourceImpl implements PermissionDataSource {
    constructor(private readonly database: Db, private readonly permissionValidatorsWrapper: PermissionValidatorsWrapper) {
        super()
    }
    createPermissionGroup(param: BaseParam<CreatePermissionGroupDTO>): Promise<BaseCreateResponse> {
        return this.permissionValidatorsWrapper.validate<BaseCreateResponse, CreatePermissionGroupDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createPermissionGroupData = param.getData();
                    let createPermissionGroupPathParam = param.getPathParam();
                    let permissionGroup = await PermissionGroup.create(
                        {
                            // we have to use mapping instead of passing entity object
                            name: createPermissionGroupData.permissionGroup.name,
                            branchId: createPermissionGroupPathParam['branchId']
                        }
                    )
                    let permissions = []
                    if (createPermissionGroupData.permissionGroup.postIds)
                        for (var i = 0; i < createPermissionGroupData.permissionGroup.postIds.length; i++) {
                            for (var j = 0; j < createPermissionGroupData.permissionGroup.userIds.length; j++) {
                                permissions.push({
                                    name: 'arbit',
                                    postId: createPermissionGroupData.permissionGroup.postIds[i],
                                    userId: createPermissionGroupData.permissionGroup.userIds[j],
                                    permissionGroupId: permissionGroup.id,
                                    actions: createPermissionGroupData.permissionGroup.actions
                                })
                            }
                        }
                    if (createPermissionGroupData.permissionGroup.serviceIds)
                        for (var i = 0; i < createPermissionGroupData.permissionGroup.serviceIds.length; i++) {
                            for (var j = 0; j < createPermissionGroupData.permissionGroup.userIds.length; j++) {
                                permissions.push({
                                    name: 'arbit',
                                    serviceId: createPermissionGroupData.permissionGroup.serviceIds[i],
                                    userId: createPermissionGroupData.permissionGroup.userIds[j],
                                    permissionGroupId: permissionGroup.id,
                                    actions: createPermissionGroupData.permissionGroup.actions
                                })
                            }
                        }
                    if (createPermissionGroupData.permissionGroup.productIds)
                        for (var i = 0; i < createPermissionGroupData.permissionGroup.productIds.length; i++) {
                            for (var j = 0; j < createPermissionGroupData.permissionGroup.userIds.length; j++) {
                                permissions.push({
                                    name: 'arbit',
                                    productId: createPermissionGroupData.permissionGroup.productIds[i],
                                    userId: createPermissionGroupData.permissionGroup.userIds[j],
                                    permissionGroupId: permissionGroup.id,
                                    actions: createPermissionGroupData.permissionGroup.actions
                                })
                            }
                        }
                    await Permission.bulkCreate(permissions)
                    resolve(BaseCreateResponse.build(permissionGroup.id, [CUDResponseObjects.permissionGroup]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PermissionGroupValidationCases.RESOURCES_ARE_IN_THEIR_CORRECT_BRANCHES,
                PermissionGroupValidationCases.NO_TEMPORARY_CUD_OPERATIONS_DENY,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    updatePermissionGroup(param: BaseParam<UpdatePermissionGroupDTO>): Promise<BaseUpdateResponse> {
        return this.permissionValidatorsWrapper.validate<BaseUpdateResponse, UpdatePermissionGroupDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let updatePermissionGroupData = param.getData();
                    let updatePermissionGroupPathparam = param.getPathParam();
                    // we should check if there is attribute for permission group itself
                    // to update those attribute and then delete and recreate permissions
                    if (updatePermissionGroupData.permissionGroup.name)
                        await PermissionGroup.update({ name: updatePermissionGroupData.permissionGroup.name },
                            {
                                where:
                                {
                                    id: updatePermissionGroupPathparam['permissionGroupId']
                                }
                            }
                        )
                    if (updatePermissionGroupData.permissionGroup.userIds
                        &&
                        (updatePermissionGroupData.permissionGroup.postIds ||
                            updatePermissionGroupData.permissionGroup.serviceIds ||
                            updatePermissionGroupData.permissionGroup.productIds)) {
                        await Permission.destroy({ where: { permissionGroupId: updatePermissionGroupPathparam['permissionGroupId'] } })

                        let permissions = []
                        if (updatePermissionGroupData.permissionGroup.postIds)
                            for (var i = 0; i < updatePermissionGroupData.permissionGroup.postIds.length; i++) {
                                for (var j = 0; j < updatePermissionGroupData.permissionGroup.userIds.length; j++) {
                                    permissions.push({
                                        name: 'arbit',
                                        postId: updatePermissionGroupData.permissionGroup.postIds[i],
                                        userId: updatePermissionGroupData.permissionGroup.userIds[j],
                                        permissionGroupId: updatePermissionGroupPathparam['permissionGroupId'],
                                        actions: updatePermissionGroupData.permissionGroup.actions
                                    })
                                }
                            }
                        if (updatePermissionGroupData.permissionGroup.serviceIds)
                            for (var i = 0; i < updatePermissionGroupData.permissionGroup.serviceIds.length; i++) {
                                for (var j = 0; j < updatePermissionGroupData.permissionGroup.userIds.length; j++) {
                                    permissions.push({
                                        name: 'arbit',
                                        serviceId: updatePermissionGroupData.permissionGroup.serviceIds[i],
                                        userId: updatePermissionGroupData.permissionGroup.userIds[j],
                                        permissionGroupId: updatePermissionGroupPathparam['permissionGroupId'],
                                        actions: updatePermissionGroupData.permissionGroup.actions
                                    })
                                }
                            }
                        if (updatePermissionGroupData.permissionGroup.productIds)
                            for (var i = 0; i < updatePermissionGroupData.permissionGroup.productIds.length; i++) {
                                for (var j = 0; j < updatePermissionGroupData.permissionGroup.userIds.length; j++) {
                                    permissions.push({
                                        name: 'arbit',
                                        productId: updatePermissionGroupData.permissionGroup.productIds[i],
                                        userId: updatePermissionGroupData.permissionGroup.userIds[j],
                                        permissionGroupId: updatePermissionGroupPathparam['permissionGroupId'],
                                        actions: updatePermissionGroupData.permissionGroup.actions
                                    })
                                }
                            }
                        await Permission.bulkCreate(permissions)
                    }
                    resolve(BaseUpdateResponse.build(updatePermissionGroupPathparam['permissionGroupId'], [CUDResponseObjects.permissionGroup]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PermissionGroupValidationCases.RESOURCES_ARE_IN_THEIR_CORRECT_BRANCHES,
                PermissionGroupValidationCases.NO_TEMPORARY_CUD_OPERATIONS_DENY,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    deletePermissionGroup(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.permissionValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let deletePermissionGroupPathParam = param.getPathParam();
                    await PermissionGroup.destroy({ where: { id: deletePermissionGroupPathParam['permissionGroupId'] } })
                    // await Permission.destroy({ where: { permissionGroupId: deletePermissionGroupPathParam['permissionGroupId'] } })
                    resolve(BaseDeleteResponse.build(deletePermissionGroupPathParam['permissionGroupId'], [CUDResponseObjects.permissionGroup]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PermissionGroupValidationCases.NO_TEMPORARY_CUD_OPERATIONS_DENY,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    getPermissionGroups(param: BaseParam<any>): Promise<BaseReadResponse<PermissionGroupEntity>> {
        return this.permissionValidatorsWrapper.validate<BaseReadResponse<PermissionGroupEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<PermissionGroupEntity>>(async (resolve, reject) => {
                try {
                    let permissionGroups = await PermissionGroup.findAll({ where: { branchId: param.getPathParam()['branchId'] } })
                    resolve(BaseReadResponse.build(await PermissionGroupEntity.buildListFromModel(permissionGroups, [])));
                } catch (err) {
                    reject(err)
                }
            });
        },
            [])
    }
}
