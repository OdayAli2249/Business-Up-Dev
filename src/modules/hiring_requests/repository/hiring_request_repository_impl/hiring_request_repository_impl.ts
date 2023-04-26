import { Injectable } from '@nestjs/common';
import { HiringRequestHandlersWrapper } from '../../inspectors/handlers/hiring_request_handlers_wrapper/hiring_request_handlers_wrapper';
import { HiringRequestDataSourceImpl } from '../../data_source/hiring_request_data_source_impl/hiring_request_data_source_impl';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { HiringRequestRepository } from '../hiring_request_repository';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { HiringRequestEntity } from '../../data_models/entities/hiring_request_entity';

@Injectable()
export class HiringRequestRepositoryImpl extends CoreRepositoryImpl implements HiringRequestRepository {
    constructor(private readonly hiringRequestHandlersWrapper: HiringRequestHandlersWrapper, private readonly hiringRequestDataSource: HiringRequestDataSourceImpl) {
        super()
    }
    createHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseCreateResponse>> {
        return this.hiringRequestHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.hiringRequestDataSource.createHiringRequest(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    rejectHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.hiringRequestHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.hiringRequestDataSource.rejectHiringRequest(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    cancelHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.hiringRequestHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.hiringRequestDataSource.cancelHiringRequest(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getUserHiringRequests(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<HiringRequestEntity>>> {
        return this.hiringRequestHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<HiringRequestEntity>;
                try {
                    response = await this.hiringRequestDataSource.getUserHiringRequests(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getPendingServiceProvidertHiringRequest(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<HiringRequestEntity>>> {
        return this.hiringRequestHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<HiringRequestEntity>;
                try {
                    response = await this.hiringRequestDataSource.getPendingServiceProvidertHiringRequest(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
