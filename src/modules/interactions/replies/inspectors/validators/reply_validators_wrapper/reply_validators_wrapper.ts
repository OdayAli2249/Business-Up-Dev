import { Injectable } from '@nestjs/common';
import { ReplyValidatorImpl } from '../reply_validator_impl/reply_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';

@Injectable()
export class ReplyValidatorsWrapper extends CoreValidatorsWrapper {
    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly replyValidator: ReplyValidatorImpl) {
        super(replyValidator);
    }
}
