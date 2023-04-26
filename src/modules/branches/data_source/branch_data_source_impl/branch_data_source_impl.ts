import { Injectable } from '@nestjs/common';
import { Db } from 'src/data/database/db/db';
import { BranchDataSource } from '../branch_data_source';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BranchValidatorsWrapper } from '../../inspectors/validators/branch_validators_wrapper/branch_validators_wrapper';
import { UserEntity } from 'src/modules/users/data_models/entities/user_entity';
import { BranchEntity } from '../../data_models/entities/branch_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { AddNewUsersToBranchDTO } from '../../data_models/dtos/add_new_users_to_branch_dto';
import { BranchesWithUsersDTO } from '../../data_models/dtos/branches_with_users_dto';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ServiceProvider } from 'src/data/database/models/service_provider';
import { BranchIncludes, BranchValidationCases } from '../../helpers/constants';
import { CoreValidationCases } from 'src/modules/core/helpers/constants';
import { HiringRequest } from 'src/data/database/models/hiring_request';
import { UserServiceProviderRole } from 'src/data/database/models/user_service_provider_role';
import { UserBranch } from 'src/data/database/models/user_branch';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';
import { User } from 'src/data/database/models/user';
import { Branch } from 'src/data/database/models/branch';

@Injectable()
export class BranchDataSourceImpl extends CoreDataSourceImpl implements BranchDataSource {

    constructor(private readonly database: Db, private readonly branchValidatorsWrapper: BranchValidatorsWrapper) {
        super()
    }


    addNewUsersToBranch(param: BaseParam<AddNewUsersToBranchDTO>): Promise<BaseCreateResponse> {
        return this.branchValidatorsWrapper.validate<BaseCreateResponse, AddNewUsersToBranchDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let addNewUsersToBranchData = param.getData();
                    let addNewUsersToBranchPathParams = param.getPathParam();
                    let userBranches = [];
                    let userServiceProviderRoles = [];
                    let branch = await Branch.findOne({ where: { id: addNewUsersToBranchPathParams['branchId'] } });
                    for (var i = 0; i < addNewUsersToBranchData.users.length; i++) {
                        userBranches.push({
                            branchId: addNewUsersToBranchPathParams['branchId'],
                            userId: addNewUsersToBranchData.users[i],
                            name: 'arbit'
                        });

                        userServiceProviderRoles.push({
                            serviceProviderId: branch.serviceProviderId,
                            userId: addNewUsersToBranchData.users[i],
                            name: 'blank'
                        });
                    }
                    await HiringRequest.update({ name: 'accepted' }, {
                        where: {
                            userId: addNewUsersToBranchData.users,
                            serviceProviderId: branch.serviceProviderId
                        }
                    })
                    await UserServiceProviderRole.bulkCreate(userServiceProviderRoles)
                    await UserBranch.bulkCreate(userBranches)
                    resolve(BaseCreateResponse.build(0, CUDResponseObjects.branch));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                BranchValidationCases.USERS_ARE_NEW_TO_SERVICE_PROVIDER,
                BranchValidationCases.USERS_IN_PENDING_HIRING_REQUESTS,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }


    addExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseCreateResponse> {
        return this.branchValidatorsWrapper.validate<BaseCreateResponse, BranchesWithUsersDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let branchesWithUsersDTO = param.getData();
                    let userBranches = []
                    for (var i = 0; i < branchesWithUsersDTO.sourceBranches.length; i++) {
                        for (var j = 0; j < branchesWithUsersDTO.sourceBranches[i].users.length; j++) {
                            userBranches.push({
                                branchId: branchesWithUsersDTO.targetBranch,
                                userId: branchesWithUsersDTO.sourceBranches[i].users[j],
                                name: 'arbit'
                            });
                        }
                    }
                    await UserBranch.bulkCreate(userBranches)
                    resolve(BaseCreateResponse.build(0, CUDResponseObjects.branch));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                BranchValidationCases.SOURCE_AND_TARGET_USERS_SEPARATED,
                BranchValidationCases.USERS_ARE_IN_THEIR_CORRECT_BRANCHES,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    removeExistedUsersFromBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseDeleteResponse> {
        return this.branchValidatorsWrapper.validate<BaseDeleteResponse, BranchesWithUsersDTO>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let branchesWithUsersDTO = param.getData();
                    for (var i = 0; i < branchesWithUsersDTO.sourceBranches.length; i++) {
                        await UserBranch.destroy({
                            where: {
                                userId: branchesWithUsersDTO.sourceBranches[i].users.map((user, _, __) => user.id),
                                branchId: branchesWithUsersDTO.sourceBranches[i].id
                            }
                        })
                        let permissionGroups = await PermissionGroup.findAll({ where: { branchId: branchesWithUsersDTO.sourceBranches[i].id } })
                        await Permission.destroy({
                            where: {
                                userId: branchesWithUsersDTO.sourceBranches[i].users.map((user, _, __) => user.id),
                                permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id)
                            }
                        })
                        // we also need to observe weither user is no longer belong to any branch so we can also remove him from roles, which make him out of whole service provider 
                    }

                    resolve(BaseDeleteResponse.build(0, CUDResponseObjects.branch));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                BranchValidationCases.USERS_ARE_IN_THEIR_CORRECT_BRANCHES
            ])
    }
    transferExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<BaseUpdateResponse> {
        return this.branchValidatorsWrapper.validate<BaseUpdateResponse, BranchesWithUsersDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    await this.removeExistedUsersFromBranch(param)
                    await this.addExistedUsersToBranch(param)
                    resolve(BaseUpdateResponse.build(1, CUDResponseObjects.branch));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                BranchValidationCases.USERS_ARE_IN_THEIR_CORRECT_BRANCHES,
                BranchValidationCases.SOURCE_AND_TARGET_USERS_SEPARATED,
                CoreValidationCases.MASTER_OR_SUBMASTER
            ])
    }
    getBranches(param: BaseParam<any>): Promise<BaseReadResponse<BranchEntity>> {
        // here may be error
        return this.branchValidatorsWrapper.validate<BaseReadResponse<BranchEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<BranchEntity>>(async (resolve, reject) => {
                try {
                    // TO DO
                    // this.database.models[ModelsName.BRANCHES]
                    let serviceProvider = await ServiceProvider.findOne({
                        where: {
                            id: param.getPathParam()['serviceProviderId'] as number
                        }
                    })
                    resolve(BaseReadResponse.build(
                        // Warning: be sure of avoiding infinit recursive - in includes
                        // this data source function can be used to get branch with its users also
                        await BranchEntity.buildListFromModel(await serviceProvider.getBranches(),
                            (param.getQueryParam()['withUsers'] as boolean) == true ?
                                [
                                    BranchIncludes.USERS
                                ] : [])
                    ));
                } catch (err) {
                    reject(err)
                }
            });
        },
            [
                BranchValidationCases.DISPLAY_BRANCHES_ALLOWED,
                // temporary
                CoreValidationCases.CAN_DO_THIS_ACTION,
                CoreValidationCases.DATA_SOURCE_IS_UNLOCKED
            ])
    }


    getBrancheUsers(param: BaseParam<any>): Promise<BaseReadResponse<UserEntity>> {
        return this.branchValidatorsWrapper.validate<BaseReadResponse<UserEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<UserEntity>>(async (resolve, reject) => {
                try {
                    let userBranches = await UserBranch.findAll({
                        where: {
                            branchId: param.getPathParam()['branchId']
                        }
                    })

                    let users = await User.findAll({
                        where: {
                            id: userBranches.map((userBranch, _, __) => userBranch.userId)
                        }
                    })

                    resolve(BaseReadResponse.build(await UserEntity.buildListFromModel(users, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                BranchValidationCases.DISPLAY_BRANCHES_ALLOWED
            ])
    }
}
