import { Injectable } from '@nestjs/common';
import { HiringRequestValidator } from '../hiring_request_validator';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { Db } from 'src/data/database/db/db';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateHiringRequestDTO } from 'src/modules/hiring_requests/data_models/dtos/create_hiring_request_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { HiringRequest } from 'src/data/database/models/hiring_request';
import { HiringRequestValidationErrors } from 'src/modules/hiring_requests/helpers/constant';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';

@Injectable()
export class HiringRequestValidatorImpl extends CoreValidatorImpl implements HiringRequestValidator {
    constructor(private readonly database: Db) {
        super()
    }
    canUserApplyForHiringRequest(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on hiring request display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    isRejectedOrNotAlreadyCreated(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let hiringRequest = await HiringRequest.findAndCountAll({
                where: {
                    userId: param.getMetaData().userId,
                    serviceProviderId: param.getPathParam()['serviceProviderId'] as number
                }
            })
            let allRejected = true;
            hiringRequest.rows.map((value, _, __) => { (value.name != 'rejected') ? allRejected = false : null })
            resolve(!hiringRequest.count || allRejected ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    HiringRequestValidationErrors.NEITHER_REJECTED_NOR_NOT_ALREADY_CREATED,
                    ProcessReult.failure,
                    'hiringRequest', 'create', {}))
        });
    }
    // isSent(param: BaseParam<any>): Promise<ValidationResult> {
    //     throw new Error('Method not implemented.');
    // }
    isPending(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let hiringRequest = await HiringRequest.findAll({ where: { id: param.getPathParam()['hiringRequestId'] as number } })
            let ispending = false;
            if (hiringRequest && hiringRequest.length != 0)
                hiringRequest.map((value, _, __) => { (value.name == 'pending') ? ispending = true : null })
            resolve(ispending ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    HiringRequestValidationErrors.NOT_PENDING,
                    ProcessReult.failure,
                    'hiringRequest', 'update - delete', {}))
        });
    }
    // neitherAlreadyAcceptedNorRejected(param: BaseParam<any>): Promise<ValidationResult> {
    //     throw new Error('Method not implemented.');
    // }
}
