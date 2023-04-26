import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service_repository';
import { ServiceHandlersWrapper } from '../../inspectors/handlers/service_handlers_wrapper/service_handlers_wrapper';
import { ServiceDataSourceImpl } from '../../data_source/service_data_source_impl/service_data_source_impl';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateServiceDTO } from '../../data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../data_models/dtos/update_service_dto';
import { ServiceEntity } from '../../data_models/entities/service_entity';

@Injectable()
export class ServiceRepositoryImpl extends CoreRepositoryImpl implements ServiceRepository {
    constructor(private readonly serviceHandlersWrapper: ServiceHandlersWrapper, private readonly serviceDataSource: ServiceDataSourceImpl) {
        super()
    }
    createService(param: BaseParam<CreateServiceDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.serviceHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.serviceDataSource.createService(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateService(param: BaseParam<UpdateServiceDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.serviceHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.serviceDataSource.updateService(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteService(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.serviceHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.serviceDataSource.deleteService(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getServices(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceEntity>>> {
        return this.serviceHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ServiceEntity>;
                try {
                    response = await this.serviceDataSource.getServices(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getServicesWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ServiceEntity>>> {
        return this.serviceHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ServiceEntity>;
                try {
                    response = await this.serviceDataSource.getServices(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
