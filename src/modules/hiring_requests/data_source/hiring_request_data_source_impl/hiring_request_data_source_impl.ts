import { Injectable } from '@nestjs/common';
import { HiringRequestDataSource } from '../hiring_request_data_source';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { HiringRequestValidatorsWrapper } from '../../inspectors/validators/hiring_request_validators_wrapper/hiring_request_validators_wrapper';
import { Db } from 'src/data/database/db/db';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { HiringRequestEntity } from '../../data_models/entities/hiring_request_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CreateHiringRequestDTO } from '../../data_models/dtos/create_hiring_request_dto';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { HiringRequestIncludes, HiringRequestValidationCases } from '../../helpers/constant';
import { HiringRequest } from 'src/data/database/models/hiring_request';

@Injectable()
export class HiringRequestDataSourceImpl extends CoreDataSourceImpl implements HiringRequestDataSource {
    constructor(private readonly database: Db, private readonly hiringRequestValidatorsWrapper: HiringRequestValidatorsWrapper) {
        super()
    }

    // TO DO accept hiring request

    createHiringRequest(param: BaseParam<any>): Promise<BaseCreateResponse> {
        return this.hiringRequestValidatorsWrapper.validate<BaseCreateResponse, CreateHiringRequestDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let hiringRequest = await HiringRequest.create({
                        userId: param.getMetaData().userId,
                        // we some how should make sure serviceProviderId key exist
                        serviceProviderId: param.getPathParam()['serviceProviderId'], name: 'pending'
                    })
                    resolve(BaseCreateResponse.build(hiringRequest.id, CUDResponseObjects.hiringRequest));
                } catch (err) {
                    reject(err)
                }
            });
        },
            [
                HiringRequestValidationCases.CAN_USER_APPLY_FOR_HIRING_REQUEST,
                HiringRequestValidationCases.IS_REJECTED_OR_NOT_ALREADY_CREATED,
            ])
    }
    rejectHiringRequest(param: BaseParam<any>): Promise<BaseUpdateResponse> {
        return this.hiringRequestValidatorsWrapper.validate<BaseUpdateResponse, any>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let hiringRequest = await HiringRequest.update(
                        { name: 'rejected' },
                        { where: { id: param.getPathParam()['hiringRequestId'] } })
                    resolve(BaseUpdateResponse.build(hiringRequest[0], CUDResponseObjects.hiringRequest));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                HiringRequestValidationCases.IS_PENDING,
            ])
    }
    cancelHiringRequest(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.hiringRequestValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let hiringRequest = await HiringRequest.destroy(
                        { where: { id: param.getPathParam()['hiringRequestId'] } })
                    resolve(BaseDeleteResponse.build(hiringRequest, CUDResponseObjects.hiringRequest));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                HiringRequestValidationCases.IS_PENDING,
            ])
    }
    getUserHiringRequests(param: BaseParam<any>): Promise<BaseReadResponse<HiringRequestEntity>> {
        return this.hiringRequestValidatorsWrapper.validate<BaseReadResponse<HiringRequestEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<HiringRequestEntity>>(async (resolve, reject) => {
                try {
                    let hiringRequests = await HiringRequest.findAll({ where: { userId: param.getMetaData().userId } })
                    resolve(BaseReadResponse.build(await HiringRequestEntity.buildListFromModel(hiringRequests,
                        [HiringRequestIncludes.SERVICE_PROVIDER])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    getPendingServiceProvidertHiringRequest(param: BaseParam<any>): Promise<BaseReadResponse<HiringRequestEntity>> {
        return this.hiringRequestValidatorsWrapper.validate<BaseReadResponse<HiringRequestEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<HiringRequestEntity>>(async (resolve, reject) => {
                try {
                    let hiringRequests = await HiringRequest.findAll({ where: { userId: param.getPathParam()['serviceProviderId'] as number } })
                    resolve(BaseReadResponse.build(await HiringRequestEntity.buildListFromModel(hiringRequests,
                        [HiringRequestIncludes.USER])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])

        // TO DO : make the last two data source functions as just one function.
    }
}
