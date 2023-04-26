import { Injectable } from '@nestjs/common';
import { SubscribtionValidator } from '../subscribtion_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateSubscribtionDTO } from 'src/modules/subscribtions/data_models/dtos/create_subscribtion_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { Subscribtion } from 'src/data/database/models/subscribtion';
import { SubscribtionValidationErrors } from 'src/modules/subscribtions/helpers/constants';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';

@Injectable()
export class SubscribtionValidatorImpl extends CoreValidatorImpl implements SubscribtionValidator {
    constructor(private readonly database: Db) {
        super()
    }
    notAlreadySubscribed(param: BaseParam<CreateSubscribtionDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let subscribtion = await Subscribtion.count({
                where: {
                    userId: param.getMetaData().userId,
                    serviceProviderId: param.getPathParam()['serviceProviderId']
                }
            })
            resolve(subscribtion != 0 ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    SubscribtionValidationErrors.ALREADY_SUBSCRIBED,
                    ProcessReult.failure,
                    'subscribtion', 'create', {}))
        });
    }

}
