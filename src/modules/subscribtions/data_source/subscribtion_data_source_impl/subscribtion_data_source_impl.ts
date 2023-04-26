import { Injectable } from '@nestjs/common';
import { SubscribtionDataSource } from '../subscribtion_data_source';
import { Db } from 'src/data/database/db/db';
import { SubscribtionValidatorsWrapper } from '../../inspectors/validators/subscribtion_validators_wrapper/subscribtion_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateSubscribtionDTO } from '../../data_models/dtos/create_subscribtion_dto';
import { UpdateSubscribtionDTO } from '../../data_models/dtos/update_subscribtion_dto';
import { SubscribtionEntity } from '../../data_models/entities/subscribtion_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { SubscribtionIncludes, SubscribtionValidationCases } from '../../helpers/constants';
import { Subscribtion } from 'src/data/database/models/subscribtion';

@Injectable()
export class SubscribtionDataSourceImpl extends CoreDataSourceImpl implements SubscribtionDataSource {
    constructor(private readonly database: Db, private readonly subscribtionValidatorsWrapper: SubscribtionValidatorsWrapper) {
        super()
    }
    createSubscribtion(param: BaseParam<CreateSubscribtionDTO>): Promise<BaseCreateResponse> {
        return this.subscribtionValidatorsWrapper.validate<BaseCreateResponse, CreateSubscribtionDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let subscribtion = await Subscribtion.create({
                        name: 'arrbit',
                        userId: param.getMetaData().userId,
                        serviceProviderId: param.getPathParam()['serviceProviderId']
                    })
                    resolve(BaseCreateResponse.build(subscribtion.id, CUDResponseObjects.subscribtion));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                SubscribtionValidationCases.NOT_ALREADY_SUBSCRIBED,
            ])
    }
    updateSubscribtion(param: BaseParam<UpdateSubscribtionDTO>): Promise<BaseUpdateResponse> {
        return this.subscribtionValidatorsWrapper.validate<BaseUpdateResponse, UpdateSubscribtionDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let UpdateSubscribtionPathParam = param.getPathParam();
                    await Subscribtion.update(param.getData().subscribtion, {
                        where: {
                            id: UpdateSubscribtionPathParam['subscribtionId'],
                        }
                    })
                    resolve(BaseUpdateResponse.build(UpdateSubscribtionPathParam['subscribtionId'],
                        CUDResponseObjects.subscribtion));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    deleteSubscribtion(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.subscribtionValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    await Subscribtion.destroy({
                        where: {
                            id: param.getPathParam()['subscribtionId'],
                        }
                    })
                    resolve(BaseDeleteResponse.build(0, CUDResponseObjects.subscribtion));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    getSubscribtions(param: BaseParam<any>): Promise<BaseReadResponse<SubscribtionEntity>> {
        return this.subscribtionValidatorsWrapper.validate<BaseReadResponse<SubscribtionEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<SubscribtionEntity>>(async (resolve, reject) => {
                let getSubscribtionsQueryParam = param.getQueryParam();
                let obj = getSubscribtionsQueryParam['userId'] ?
                    { userId: getSubscribtionsQueryParam['userId'] } : { serviceProviderId: getSubscribtionsQueryParam['serviceProviderId'] };
                try {
                    let subscribtions = await Subscribtion.findAll({
                        where: obj
                    })
                    resolve(BaseReadResponse.build(await SubscribtionEntity.buildListFromModel(
                        subscribtions, [getSubscribtionsQueryParam['userId']
                            ? SubscribtionIncludes.SERVICE_PROVIDER : SubscribtionIncludes.USER]
                    )));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
}
