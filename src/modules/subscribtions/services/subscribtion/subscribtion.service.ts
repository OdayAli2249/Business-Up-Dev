import { Injectable } from '@nestjs/common';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { SubscribtionRepositoryImpl } from '../../repository/subscribtion_repository_impl/subscribtion_repository_impl';
import { Failure } from 'src/modules/core/errors/failure';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { SubscribtionEntity } from '../../data_models/entities/subscribtion_entity';
import { CreateSubscribtionDTO } from '../../data_models/dtos/create_subscribtion_dto';
import { UpdateSubscribtionDTO } from '../../data_models/dtos/update_subscribtion_dto';

@Injectable()
export class SubscribtionService {

    constructor(
        private readonly subscribtionRepository: SubscribtionRepositoryImpl) { }

    createSubscribtion(createSubscribtionDTO: CreateSubscribtionDTO,
        serviceProviderId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createSubscribtionDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.subscribtionRepository.createSubscribtion(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateSubscribtion(updateSubscribtionDTO: UpdateSubscribtionDTO,
        subscribtionId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['subscribtionId'] = subscribtionId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateSubscribtionDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.subscribtionRepository.updateSubscribtion(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteSubscribtion(subscribtionId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['subscribtionId'] = subscribtionId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.subscribtionRepository.deleteSubscribtion(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getSubscribtions(userId: number, serviceProviderId: number)
        : Promise<BaseReadResponse<SubscribtionEntity> | Failure> {
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
            let request: FailureOr<BaseReadResponse<SubscribtionEntity>>;
            request = await this.subscribtionRepository.getSubscribtions(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

}
