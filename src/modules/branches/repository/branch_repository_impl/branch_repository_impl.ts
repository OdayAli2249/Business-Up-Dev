import { Injectable } from '@nestjs/common';
import { BranchRepository } from '../branch_repository';
import { BranchHandlersWrapper } from '../../inspectors/handlers/branch_handlers_wrapper/branch_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { BranchDataSourceImpl } from '../../data_source/branch_data_source_impl/branch_data_source_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { UserEntity } from 'src/modules/users/data_models/entities/user_entity';
import { AddNewUsersToBranchDTO } from '../../data_models/dtos/add_new_users_to_branch_dto';
import { BranchesWithUsersDTO } from '../../data_models/dtos/branches_with_users_dto';
import { BranchEntity } from '../../data_models/entities/branch_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class BranchRepositoryImpl extends CoreRepositoryImpl implements BranchRepository {
    constructor(private readonly branchHandlersWrapper: BranchHandlersWrapper, private readonly branchDataSource: BranchDataSourceImpl) {
        super()
    }
    
    getBranches(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<BranchEntity>>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<BranchEntity>;
                try {
                    response = await this.branchDataSource.getBranches(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getBrancheUsers(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<UserEntity>>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<UserEntity>;
                try {
                    response = await this.branchDataSource.getBrancheUsers(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    addNewUsersToBranch(param: BaseParam<AddNewUsersToBranchDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.branchDataSource.addNewUsersToBranch(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    addExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.branchDataSource.addExistedUsersToBranch(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    removeExistedUsersFromBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.branchDataSource.removeExistedUsersFromBranch(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    transferExistedUsersToBranch(param: BaseParam<BranchesWithUsersDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.branchHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.branchDataSource.transferExistedUsersToBranch(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
