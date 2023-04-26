import { Injectable } from '@nestjs/common';
import { SubscribtionRepository } from '../subscribtion_repository';
import { SubscribtionDataSourceImpl } from '../../data_source/subscribtion_data_source_impl/subscribtion_data_source_impl';
import { SubscribtionHandlersWrapper } from '../../inspectors/handlers/subscribtion_handlers_wrapper/subscribtion_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateSubscribtionDTO } from '../../data_models/dtos/create_subscribtion_dto';
import { UpdateSubscribtionDTO } from '../../data_models/dtos/update_subscribtion_dto';
import { SubscribtionEntity } from '../../data_models/entities/subscribtion_entity';

@Injectable()
export class SubscribtionRepositoryImpl extends CoreRepositoryImpl implements SubscribtionRepository {
    constructor(private readonly subscribtionHandlersWrapper: SubscribtionHandlersWrapper, private readonly subscribtionDataSource: SubscribtionDataSourceImpl) {
        super()
    }
    createSubscribtion(param: BaseParam<CreateSubscribtionDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.subscribtionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.subscribtionDataSource.createSubscribtion(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateSubscribtion(param: BaseParam<UpdateSubscribtionDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.subscribtionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.subscribtionDataSource.updateSubscribtion(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteSubscribtion(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.subscribtionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.subscribtionDataSource.deleteSubscribtion(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getSubscribtions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<SubscribtionEntity>>> {
        return this.subscribtionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<SubscribtionEntity>;
                try {
                    response = await this.subscribtionDataSource.getSubscribtions(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
