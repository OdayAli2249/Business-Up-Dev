import { Injectable } from '@nestjs/common';
import { AddNewUsersToBranchDTO } from '../../data_models/dtos/add_new_users_to_branch_dto';
import { BranchesWithUsersDTO } from '../../data_models/dtos/branches_with_users_dto';
import { BranchRepositoryImpl } from '../../repository/branch_repository_impl/branch_repository_impl';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BranchEntity } from '../../data_models/entities/branch_entity';
import { UserEntity } from 'src/modules/users/data_models/entities/user_entity';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { Failure } from 'src/modules/core/errors/failure';

@Injectable()
export class BranchService {

    constructor(private readonly branchRepository: BranchRepositoryImpl) { }

    getBranches(serviceProviderId: number, withUsers: boolean): Promise<BaseReadResponse<BranchEntity> | Failure> {

        let pathParam = new Map<string, any>();
        pathParam['serviceProviderId'] = serviceProviderId;
        let queryParam = new Map<string, any>();
        queryParam['withUsers'] = withUsers;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<BranchEntity>>;
            request = await this.branchRepository.getBranches(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getBrancheUsers(branchId: number): Promise<BaseReadResponse<UserEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<UserEntity>>;
            request = await this.branchRepository.getBrancheUsers(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    addNewUsersToBranch(createCustomerDto: AddNewUsersToBranchDTO,
        serviceProviderId: number,
        branchId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceProviderId'] = serviceProviderId;
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createCustomerDto,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.branchRepository.addNewUsersToBranch(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    addExistedUsersToBranch(branchesWithUsersDTO: BranchesWithUsersDTO)
        : Promise<BaseCreateResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: branchesWithUsersDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.branchRepository.addExistedUsersToBranch(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    removeExistedUsersFromBranch(branchesWithUsersDTO: BranchesWithUsersDTO)
        : Promise<BaseDeleteResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: branchesWithUsersDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.branchRepository.removeExistedUsersFromBranch(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    transferExistedUsersToBranch(branchesWithUsersDTO: BranchesWithUsersDTO)
        : Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: branchesWithUsersDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.branchRepository.transferExistedUsersToBranch(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

}
