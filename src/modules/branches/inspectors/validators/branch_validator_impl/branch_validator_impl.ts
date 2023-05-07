import { Injectable } from '@nestjs/common';
import { BranchValidator } from '../branch_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { AddNewUsersToBranchDTO } from 'src/modules/branches/data_models/dtos/add_new_users_to_branch_dto';
import { BranchesWithUsersDTO } from 'src/modules/branches/data_models/dtos/branches_with_users_dto';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BranchValidationErrors } from 'src/modules/branches/helpers/constants';
import { HiringRequest } from 'src/data/database/models/hiring_request';
import { UserBranch } from 'src/data/database/models/user_branch';
import { Branch } from 'src/data/database/models/branch';

@Injectable()
export class BranchValidatorImpl extends CoreValidatorImpl implements BranchValidator {
    constructor(private readonly database: Db) {
        super()
    }
    isUsersInPendingHiringRequests(param: BaseParam<AddNewUsersToBranchDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let paramData = param.getData();
            let addNewUsersToBranchPathParams = param.getPathParam();
            let branch = await Branch.findOne({ where: { id: addNewUsersToBranchPathParams['branchId'] } });
            let pendingHiringRequests = await HiringRequest.count(
                {
                    where: {
                        userId: paramData.users, name: 'pending', serviceProviderId: branch.serviceProviderId
                    }
                });
            resolve((pendingHiringRequests == paramData.users.length) ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    BranchValidationErrors.USERS_NOT_IN_PENDING_HIRING_REQUEST, ProcessReult.failure, 'branch', 'create', {}))
        });
    }
    noSourceAndTargetUsersIntersection(param: BaseParam<BranchesWithUsersDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let paramData = param.getData();
            let users = []
            for (var i = 0; i < paramData.sourceBranches.length; i++) {
                for (var j = 0; j < paramData.sourceBranches[i].userIds.length; j++) {
                    users.push(
                        paramData.sourceBranches[i].userIds[j]
                    );
                }
            }
            let targetUsers = await UserBranch.findAll({ where: { branchId: paramData.targetBranch } })
            let commonUsers = targetUsers.map((userBranch) => userBranch.userId).filter((element, index, array) => users.includes(element))

            resolve(commonUsers.length == 0 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    BranchValidationErrors.SOURCE_AND_TARGET_USERS_INTERSECTION,
                    ProcessReult.failure,
                    'branch',
                    'update',
                    { intersectedUsers: commonUsers }))
        });
    }
    usersAreInTheirCorrectBranches(param: BaseParam<BranchesWithUsersDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let paramData = param.getData();
            let sneakingUsers = []
            // we can make this query more simply codewise and performancewise
            for (var i = 0; i < paramData.sourceBranches.length; i++) {
                for (var j = 0; j < paramData.sourceBranches[i].userIds.length; j++) {
                    let res = await UserBranch.findOne({
                        where: {
                            userId: paramData.sourceBranches[i].userIds[j],
                            branchId: paramData.sourceBranches[i].id
                        }
                    })
                    if (!res)
                        sneakingUsers.push(paramData.sourceBranches[i].userIds[j])
                }
            }
            resolve(sneakingUsers.length == 0 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null, BranchValidationErrors.USERS_ARE_NOT_IN_THEIR_CORRECT_BRANCHES, ProcessReult.failure, 'branch', 'update', {}))
        });
    }
    canDisplayBranches(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on branch display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    isUsersNewToServiceProvider(param: BaseParam<AddNewUsersToBranchDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let paramData = param.getData();
            let paramPath = param.getPathParam();
            let branche = await Branch.findOne({ where: { id: paramPath['branchId'] } })
            let branches = await Branch.findAll({ where: { serviceProviderId: branche.serviceProviderId } })
            let userBranches = await UserBranch.findAll({ where: { userId: paramData.users, branchId: branches.map((branch) => branch.id) } })
            resolve(userBranches.length == 0 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    BranchValidationErrors.USERS_NOT_NEW_TO_SERVICE_PROVIDER,
                    ProcessReult.failure,
                    'branch', 'create', {}))
        });
    }
}
