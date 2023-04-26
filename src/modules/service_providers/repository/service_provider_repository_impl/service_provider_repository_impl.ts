import { Injectable } from '@nestjs/common';
import { ServiceProviderRepository } from '../service_provider_repository';
import { ServiceProviderHandlersWrapper } from '../../inspectors/handlers/service_provider_handlers_wrapper/service_provider_handlers_wrapper';
import { ServiceProviderDataSourceImpl } from '../../data_source/service_provider_data_source_impl/service_provider_data_source_impl';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateServiceProviderDTO } from '../../data_models/dtos/create_service_provider_dto';
import { RemoveUsersFromServiceProviderDTO } from '../../data_models/dtos/remove_users_from_service_provider_dto';
import { ServiceProviderEntity } from '../../data_models/entities/service_provider_entity';

@Injectable()
export class ServiceProviderRepositoryImpl extends CoreRepositoryImpl implements ServiceProviderRepository {
    constructor(private readonly serviceProviderHandlersWrapper: ServiceProviderHandlersWrapper, private readonly serviceProviderDataSource: ServiceProviderDataSourceImpl) {
        super()
    }
    createServiceProvider(param: BaseParam<CreateServiceProviderDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.serviceProviderDataSource.createServiceProvider(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getServiceProviders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceProviderEntity>>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ServiceProviderEntity>;
                try {
                    response = await this.serviceProviderDataSource.getServiceProviders(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    geteUserServiceProviders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceProviderEntity>>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ServiceProviderEntity>;
                try {
                    response = await this.serviceProviderDataSource.geteUserServiceProviders(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    removeUsersFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.serviceProviderDataSource.removeUsersFromServiceProvider(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    addSubMasterUser(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.serviceProviderDataSource.addSubMasterUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    removeSubMasterUser(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.serviceProviderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.serviceProviderDataSource.removeSubMasterUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
