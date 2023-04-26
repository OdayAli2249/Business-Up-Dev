import { Injectable } from '@nestjs/common';
import { ServiceProviderDataSource } from '../service_provider_data_source';
import { ServiceProviderValidatorsWrapper } from '../../inspectors/validators/service_provider_validators_wrapper/service_provider_validators_wrapper';
import { Db } from 'src/data/database/db/db';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateServiceProviderDTO } from '../../data_models/dtos/create_service_provider_dto';
import { RemoveUsersFromServiceProviderDTO } from '../../data_models/dtos/remove_users_from_service_provider_dto';
import { ServiceProviderEntity } from '../../data_models/entities/service_provider_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { ServiceProviderValidationCases } from '../../helpers/constants';
import { CoreValidationCases } from 'src/modules/core/helpers/constants';
import { ServiceProvider } from 'src/data/database/models/service_provider';
import { BranchEntity } from 'src/modules/branches/data_models/entities/branch_entity';
import { Branch } from 'src/data/database/models/branch';
import { UserServiceProviderRole } from 'src/data/database/models/user_service_provider_role';
import { UserBranch } from 'src/data/database/models/user_branch';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';

@Injectable()
export class ServiceProviderDataSourceImpl extends CoreDataSourceImpl implements ServiceProviderDataSource {
    constructor(private readonly database: Db, private readonly serviceProviderValidatorsWrapper: ServiceProviderValidatorsWrapper) {
        super()
    }
    createServiceProvider(param: BaseParam<CreateServiceProviderDTO>): Promise<BaseCreateResponse> {
        return this.serviceProviderValidatorsWrapper.validate<BaseCreateResponse, CreateServiceProviderDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createServiceProviderDTO = param.getData();
                    const serviceProvider = await ServiceProvider.create(createServiceProviderDTO.serviceProvider);
                    var brancheEntities: BranchEntity[] = createServiceProviderDTO.branches;
                    brancheEntities.map((branch, _, __) => branch.serviceProviderId = serviceProvider.id)
                    await UserServiceProviderRole.create({
                        userId: createServiceProviderDTO.userId,
                        serviceProviderId: serviceProvider.id, role: 'master'
                    })   // TO DO optional : make it enum
                    // TO DO optional find away to explicitly specify what attributes to map
                    const branches = await Branch.bulkCreate(brancheEntities)
                    var userBranches = [];
                    for (var i = 0; i < branches.length; i++) {
                        userBranches.push({
                            name: 'arbit',
                            userId: createServiceProviderDTO.userId,
                            branchId: branches[i].id
                        })
                    }
                    await UserBranch.bulkCreate(userBranches)
                    resolve(BaseCreateResponse.build(serviceProvider.id, CUDResponseObjects.serviceProvider));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceProviderValidationCases.NOT_EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER,
            ])
    }
    getServiceProviders(param: BaseParam<any>): Promise<BaseReadResponse<ServiceProviderEntity>> {
        return this.serviceProviderValidatorsWrapper.validate<BaseReadResponse<ServiceProviderEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ServiceProviderEntity>>(async (resolve, reject) => {
                try {
                    let serviceProviders = await ServiceProvider.findAll()
                    resolve(BaseReadResponse.build(await ServiceProviderEntity.buildListFromModel(serviceProviders, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    geteUserServiceProviders(param: BaseParam<any>): Promise<BaseReadResponse<ServiceProviderEntity>> {
        return this.serviceProviderValidatorsWrapper.validate<BaseReadResponse<ServiceProviderEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ServiceProviderEntity>>(async (resolve, reject) => {
                try {
                    // sub-query is bad idea "performance-wise"
                    // we (I ^-^) will work on improve this queries in future projects
                    let userBranches = await UserBranch.findAll({
                        where: {
                            userId: param.getPathParam()['userId']
                        }
                    });
                    let branches = await Branch.findAll({
                        where: {
                            id: userBranches.map((userBranch) => userBranch.branchId)
                        }
                    });
                    let serviceProviders = await ServiceProvider.findAll({
                        where: {
                            id: branches.map((branch) => branch.serviceProviderId)
                        }
                    });
                    resolve(BaseReadResponse.build(await ServiceProviderEntity.buildListFromModel(serviceProviders, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    removeUsersFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<BaseDeleteResponse> {
        return this.serviceProviderValidatorsWrapper.validate<BaseDeleteResponse, RemoveUsersFromServiceProviderDTO>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let removeUsersFromServiceProviderPathParams = param.getPathParam();
                    let removeUsersFromServiceProviderPathData = param.getData();
                    let branches = await Branch.findAll({
                        where:
                        {
                            serviceProviderId: removeUsersFromServiceProviderPathParams['serviceProviderId']
                        }
                    })
                    await UserBranch.destroy({
                        where: { userId: removeUsersFromServiceProviderPathData.users, branchId: branches.map((branch) => branch.id) }
                    })
                    await UserServiceProviderRole.destroy({
                        where: {
                            userId: removeUsersFromServiceProviderPathData.users,
                            serviceProviderId: removeUsersFromServiceProviderPathParams['serviceProviderId']
                        }
                    })
                    let permissionGroups = await PermissionGroup.findAll({
                        where:
                        {
                            branchId: branches.map((branch) => branch.id)
                        }
                    })
                    await Permission.destroy({
                        where:
                        {
                            userId: removeUsersFromServiceProviderPathData.users, permissionGroupId: permissionGroups.map((PermissionGroup) => PermissionGroup.id)
                        }
                    })
                    // remove his accepted hiring request,so that he can send new one
                    resolve(BaseDeleteResponse.build(1, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceProviderValidationCases.USER_WORKS_IN_SERVICE_PROVIDER,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    addSubMasterUser(param: BaseParam<any>): Promise<BaseUpdateResponse> {
        return this.serviceProviderValidatorsWrapper.validate<BaseUpdateResponse, any>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let addSubMasterUserrQueryParams = param.getQueryParam();
                    await UserServiceProviderRole.update(
                        {
                            role: 'sub-master'
                        },
                        {
                            where:
                            {
                                userId: addSubMasterUserrQueryParams['userId'],
                                serviceProviderId: addSubMasterUserrQueryParams['serviceProviderId']
                            }
                        })
                    resolve(BaseUpdateResponse.build(1, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceProviderValidationCases.IS_MASTER,
            ])
    }
    removeSubMasterUser(param: BaseParam<any>): Promise<BaseUpdateResponse> {
        return this.serviceProviderValidatorsWrapper.validate<BaseUpdateResponse, any>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let addSubMasterUserrQueryParams = param.getQueryParam();
                    await UserServiceProviderRole.update(
                        {
                            role: 'blank'
                        },
                        {
                            where:
                            {
                                userId: addSubMasterUserrQueryParams['userId'],
                                serviceProviderId: addSubMasterUserrQueryParams['serviceProviderId']
                            }
                        })

                    resolve(BaseUpdateResponse.build(1, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceProviderValidationCases.IS_MASTER,
            ])
    }
}
