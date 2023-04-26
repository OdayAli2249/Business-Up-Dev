import { Injectable } from '@nestjs/common';
import { ReplyValidator } from '../reply_validator';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { Db } from 'src/data/database/db/db';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateReplyDTO } from '../../../data_models/dtos/create_reply_dto';
import { UpdateReplyDTO } from '../../../data_models/dtos/update_reply_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { Reply } from 'src/data/database/models/reply';
import { ReplyValidationErrors } from '../../../helpers/constants';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';

@Injectable()
export class ReplyValidatorImpl extends CoreValidatorImpl implements ReplyValidator {
    constructor(private readonly database: Db) {
        super()
    }
    noReplyCreationBlocked(param: BaseParam<CreateReplyDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reply creation now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            resolve(ValidationResult.buildSuccess())
        });
    }
    canUpdateReply(param: BaseParam<UpdateReplyDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reply update now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let reply = await Reply.findOne({ where: { id: param.getPathParam()['replyId'] } })

            resolve(reply.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ReplyValidationErrors.CAN_NOT_UPDATE_REPLY,
                    ProcessReult.failure,
                    'reply', 'update', {}))
        });
    }
    canDeleteReply(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reply delete now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let reply = await Reply.findOne({ where: { id: param.getPathParam()['replyId'] } })

            resolve(reply.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ReplyValidationErrors.CAN_NOT_DELETE_REPLY,
                    ProcessReult.failure,
                    'reply', 'delete', {}))
        });
    }
    noRepliesDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary replies display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
}
