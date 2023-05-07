import { Injectable } from '@nestjs/common';
import { ReplyValidatorImpl } from '../reply_validator_impl/reply_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ReplyValidationCases } from '../../../helpers/constants';
import { CreateReplyDTO } from '../../../data_models/dtos/create_reply_dto';
import { UpdateReplyDTO } from '../../../data_models/dtos/update_reply_dto';

@Injectable()
export class ReplyValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly replyValidator: ReplyValidatorImpl) {
        super(replyValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case ReplyValidationCases.CAN_DELETE_REPLY: {
                        result = await this.replyValidator.canDeleteReply(param);
                        resolve(result);
                        break;
                    }
                    case ReplyValidationCases.CAN_UPDATE_REPLY: {
                        result = await this.replyValidator.canUpdateReply(
                            (param as unknown) as BaseParam<UpdateReplyDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ReplyValidationCases.NO_REPLY_CREATION_BLOCK: {
                        result = await this.replyValidator.noReplyCreationBlocked(
                            (param as unknown) as BaseParam<CreateReplyDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ReplyValidationCases.NO_REPLY_DISPLAY_BLOCK: {
                        result = await this.replyValidator.noRepliesDisplayBlocked(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    default: {
                        result = await this.checkForCore(validationCase, param);
                        resolve(result);
                        break;
                    }
                }
            } catch (err) {
                // resolve for database errors from validations
                // or type parsing error
                // but for now, we consider both as database error
                resolve(ValidationResult.buildDatabaseError())
            }
        });
    }
}
