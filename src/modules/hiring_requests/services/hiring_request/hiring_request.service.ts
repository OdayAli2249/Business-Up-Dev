import { Injectable } from '@nestjs/common';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { HiringRequestRepositoryImpl } from '../../repository/hiring_request_repository_impl/hiring_request_repository_impl';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { HiringRequestEntity } from '../../data_models/entities/hiring_request_entity';

@Injectable()
export class HiringRequestService {

    constructor(
        private readonly hiringRequestRepository: HiringRequestRepositoryImpl,) { }

    createHiringRequest(serviceProviderId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.hiringRequestRepository.createHiringRequest(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    rejectHiringRequest(hiringRequestId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['hiringRequestId'] = hiringRequestId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.hiringRequestRepository.rejectHiringRequest(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    cancelHiringRequest(hiringRequestId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['hiringRequestId'] = hiringRequestId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.hiringRequestRepository.cancelHiringRequest(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getUserHiringRequests()
        : Promise<BaseReadResponse<HiringRequestEntity> | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<HiringRequestEntity>>;
            request = await this.hiringRequestRepository.getUserHiringRequests(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getPendingServiceProvidertHiringRequest(serviceProviderId: number)
        : Promise<BaseReadResponse<HiringRequestEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<HiringRequestEntity>>;
            request = await this.hiringRequestRepository.getPendingServiceProvidertHiringRequest(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

}
