import { Injectable } from '@nestjs/common';
import { ServiceProviderRepositoryImpl } from '../../repository/service_provider_repository_impl/service_provider_repository_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { ServiceProviderEntity } from '../../data_models/entities/service_provider_entity';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateServiceProviderDTO } from '../../data_models/dtos/create_service_provider_dto';
import { RemoveUsersFromServiceProviderDTO } from '../../data_models/dtos/remove_users_from_service_provider_dto';

@Injectable()
export class ServiceProviderService {

    constructor(
        private readonly serviceProviderRepository: ServiceProviderRepositoryImpl) { }

    createServiceProvider(createServiceProviderDTO: CreateServiceProviderDTO): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createServiceProviderDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.serviceProviderRepository.createServiceProvider(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getServiceProviders()
        : Promise<BaseReadResponse<ServiceProviderEntity> | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ServiceProviderEntity>>;
            request = await this.serviceProviderRepository.getServiceProviders(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getUserServiceProviders(userId: number)
        : Promise<BaseReadResponse<ServiceProviderEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['userId'] = userId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ServiceProviderEntity>>;
            request = await this.serviceProviderRepository.geteUserServiceProviders(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    removeSubMasterUser(userId: number, serviceProviderId: number): Promise<BaseUpdateResponse | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['userId'] = userId;
        queryParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.serviceProviderRepository.removeSubMasterUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    addSubMasterUser(userId: number, serviceProviderId: number): Promise<BaseUpdateResponse | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['userId'] = userId;
        queryParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.serviceProviderRepository.addSubMasterUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    removeUsersFromServiceProvider(removeUsersFromServiceProviderDTO:
        RemoveUsersFromServiceProviderDTO): Promise<BaseDeleteResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: removeUsersFromServiceProviderDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.serviceProviderRepository.removeUsersFromServiceProvider(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

}
